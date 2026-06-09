import { createClerkClient, verifyToken as verifyClerkToken } from "@clerk/backend";
import crypto from "crypto";
import { prisma } from "./prisma.js";

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
const CLERK_ISSUER_URL = (
  process.env.CLERK_ISSUER_URL ||
  "https://noble-antelope-0.clerk.accounts.dev"
).replace(/\/$/, "");
const AUTHORIZED_PARTIES = process.env.CLERK_AUTHORIZED_PARTIES?.split(",")
  .map((party) => party.trim())
  .filter(Boolean);
const JWKS_CACHE_TTL_MS = 60 * 60 * 1000;

const clerkClient = CLERK_SECRET_KEY
  ? createClerkClient({ secretKey: CLERK_SECRET_KEY })
  : null;
let jwksCache = { expiresAt: 0, keys: [] };

function getPrimaryEmailAddress(user) {
  return (
    user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId) ||
    user.emailAddresses[0]
  );
}

async function findUserByEmail(email) {
  return prisma.user.findFirst({
    where: {
      email: {
        equals: email,
        mode: "insensitive",
      },
    },
  });
}

function normalizeProfile(profile = {}) {
  return {
    email: typeof profile.email === "string" ? profile.email.trim().toLowerCase() : "",
    name: typeof profile.name === "string" ? profile.name.trim() : null,
    avatarUrl: typeof profile.avatarUrl === "string" ? profile.avatarUrl.trim() : null,
  };
}

function decodeBase64UrlJson(value) {
  return JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
}

async function getPublicSigningKey(kid) {
  if (Date.now() >= jwksCache.expiresAt) {
    const response = await fetch(`${CLERK_ISSUER_URL}/.well-known/jwks.json`);

    if (!response.ok) {
      throw new Error(`Unable to load Clerk signing keys (${response.status})`);
    }

    const body = await response.json();
    jwksCache = {
      expiresAt: Date.now() + JWKS_CACHE_TTL_MS,
      keys: Array.isArray(body.keys) ? body.keys : [],
    };
  }

  const jwk = jwksCache.keys.find((key) => key.kid === kid && key.alg === "RS256");
  if (!jwk) {
    jwksCache.expiresAt = 0;
    throw new Error("Clerk signing key not found");
  }

  return crypto.createPublicKey({ key: jwk, format: "jwk" });
}

async function verifyClerkTokenWithPublicKey(token) {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Malformed Clerk token");
  }

  const [encodedHeader, encodedPayload, signature] = parts;
  const header = decodeBase64UrlJson(encodedHeader);
  const claims = decodeBase64UrlJson(encodedPayload);

  if (header.alg !== "RS256" || !header.kid) {
    throw new Error("Unsupported Clerk token");
  }

  const publicKey = await getPublicSigningKey(header.kid);
  const isValid = crypto.verify(
    "RSA-SHA256",
    Buffer.from(`${encodedHeader}.${encodedPayload}`),
    publicKey,
    Buffer.from(signature, "base64url"),
  );

  if (!isValid) {
    throw new Error("Invalid Clerk token signature");
  }

  const now = Math.floor(Date.now() / 1000);
  if (claims.iss !== CLERK_ISSUER_URL) {
    throw new Error("Invalid Clerk token issuer");
  }
  if (!claims.exp || claims.exp <= now || (claims.nbf && claims.nbf > now)) {
    throw new Error("Expired or inactive Clerk token");
  }
  if (AUTHORIZED_PARTIES?.length && !AUTHORIZED_PARTIES.includes(claims.azp)) {
    throw new Error("Invalid Clerk authorized party");
  }

  return claims;
}

async function verifySessionToken(token) {
  if (CLERK_SECRET_KEY) {
    try {
      return await verifyClerkToken(token, {
        secretKey: CLERK_SECRET_KEY,
        ...(AUTHORIZED_PARTIES?.length ? { authorizedParties: AUTHORIZED_PARTIES } : {}),
      });
    } catch (error) {
      console.warn("Clerk secret-key verification failed; trying public JWKS:", error.message);
    }
  }

  return verifyClerkTokenWithPublicKey(token);
}

export async function getOrCreateUserFromClerkToken(token, profile = {}) {
  const claims = await verifySessionToken(token);
  const normalizedProfile = normalizeProfile(profile);

  if (!claims.sub) {
    throw new Error("Clerk token is missing a user id");
  }

  const existingByClerkId = await prisma.user.findUnique({
    where: { clerkId: claims.sub },
  });

  if (existingByClerkId) {
    return existingByClerkId;
  }

  let email = normalizedProfile.email;
  let name = normalizedProfile.name;
  let avatarUrl = normalizedProfile.avatarUrl;
  let emailVerified = null;

  if (clerkClient) {
    const clerkUser = await clerkClient.users.getUser(claims.sub);
    const primaryEmail = getPrimaryEmailAddress(clerkUser);
    email = primaryEmail?.emailAddress?.trim().toLowerCase() || email;
    name = clerkUser.fullName || clerkUser.username || name;
    avatarUrl = clerkUser.imageUrl || avatarUrl;
    emailVerified = primaryEmail?.verification?.status === "verified" ? new Date() : null;
  }

  if (!email) {
    throw new Error("Unable to determine the Clerk user's email address");
  }

  const userProfile = {
    clerkId: claims.sub,
    name,
    avatarUrl,
    emailVerified,
  };

  const existingByEmail = await findUserByEmail(email);

  if (existingByEmail) {
    return prisma.user.update({
      where: { id: existingByEmail.id },
      data: userProfile,
    });
  }

  try {
    return await prisma.user.create({
      data: {
        ...userProfile,
        email,
        password: null,
      },
    });
  } catch (error) {
    // A second first-time request may have linked this Clerk account already.
    const linkedUser = await prisma.user.findUnique({
      where: { clerkId: claims.sub },
    });

    if (linkedUser) {
      return linkedUser;
    }

    throw error;
  }
}
