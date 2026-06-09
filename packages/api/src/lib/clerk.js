import { createClerkClient, verifyToken as verifyClerkToken } from "@clerk/backend";
import { prisma } from "./prisma.js";

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
const AUTHORIZED_PARTIES = process.env.CLERK_AUTHORIZED_PARTIES?.split(",")
  .map((party) => party.trim())
  .filter(Boolean);

const clerkClient = CLERK_SECRET_KEY
  ? createClerkClient({ secretKey: CLERK_SECRET_KEY })
  : null;

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

export async function getOrCreateUserFromClerkToken(token) {
  if (!CLERK_SECRET_KEY || !clerkClient) {
    throw new Error("CLERK_SECRET_KEY environment variable must be set");
  }

  const claims = await verifyClerkToken(token, {
    secretKey: CLERK_SECRET_KEY,
    ...(AUTHORIZED_PARTIES?.length ? { authorizedParties: AUTHORIZED_PARTIES } : {}),
  });

  if (!claims.sub) {
    throw new Error("Clerk token is missing a user id");
  }

  const existingByClerkId = await prisma.user.findUnique({
    where: { clerkId: claims.sub },
  });

  if (existingByClerkId) {
    return existingByClerkId;
  }

  const clerkUser = await clerkClient.users.getUser(claims.sub);
  const primaryEmail = getPrimaryEmailAddress(clerkUser);
  const email = primaryEmail?.emailAddress?.trim().toLowerCase();

  if (!email) {
    throw new Error("Clerk user is missing a primary email address");
  }

  const profile = {
    clerkId: claims.sub,
    name: clerkUser.fullName || clerkUser.username || null,
    avatarUrl: clerkUser.imageUrl || null,
    emailVerified: primaryEmail.verification?.status === "verified" ? new Date() : null,
  };

  const existingByEmail = await findUserByEmail(email);

  if (existingByEmail) {
    return prisma.user.update({
      where: { id: existingByEmail.id },
      data: profile,
    });
  }

  try {
    return await prisma.user.create({
      data: {
        ...profile,
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
