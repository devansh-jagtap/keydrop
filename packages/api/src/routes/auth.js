import { Router } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import rateLimit from "express-rate-limit";
import { prisma } from "../lib/prisma.js";
import { signToken, verifyToken } from "../lib/jwt.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later" },
});

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function createUserToken(user) {
  return signToken({ userId: user.id, email: user.email });
}

// POST /auth/register
router.post("/register", authLimiter, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  const normalizedEmail = normalizeEmail(email);
  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email: normalizedEmail, password: hashed },
  });

  const token = createUserToken(user);
  return res.json({ token, email: user.email });
});

// POST /auth/login
router.post("/login", authLimiter, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const user = await prisma.user.findUnique({ where: { email: normalizeEmail(email) } });
  if (!user || !user.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = createUserToken(user);
  return res.json({ token, email: user.email });
});

// POST /auth/clerk/token — exchanges a verified Clerk session for a KeyDrop JWT
router.post("/clerk/token", authLimiter, requireAuth, async (req, res) => {
  const token = signToken({ userId: req.user.userId, email: req.user.email });
  return res.json({ token, email: req.user.email });
});

// POST /auth/google — exchanges a Google OAuth code for a KeyDrop JWT
router.post("/google", authLimiter, async (req, res) => {
  const { code, redirectUri } = req.body;

  if (!code || !redirectUri) {
    return res.status(400).json({ message: "Code and redirectUri required" });
  }

  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return res.status(500).json({ message: "Google OAuth is not configured" });
  }

  try {
    const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok || !tokenData.access_token) {
      return res.status(401).json({ message: "Google authorization failed" });
    }

    const profileResponse = await fetch(GOOGLE_USERINFO_URL, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const profile = await profileResponse.json();
    if (!profileResponse.ok || !profile.sub || !profile.email || profile.email_verified !== true) {
      return res.status(401).json({ message: "Unable to verify Google account" });
    }

    const email = normalizeEmail(profile.email);
    let user = await prisma.user.findUnique({ where: { googleId: profile.sub } });

    if (!user) {
      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        user = await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            googleId: profile.sub,
            name: profile.name || existingUser.name,
            avatarUrl: profile.picture || existingUser.avatarUrl,
            emailVerified: new Date(),
          },
        });
      } else {
        user = await prisma.user.create({
          data: {
            email,
            password: null,
            googleId: profile.sub,
            name: profile.name || null,
            avatarUrl: profile.picture || null,
            emailVerified: new Date(),
          },
        });
      }
    }

    const token = createUserToken(user);
    return res.json({ token, email: user.email });
  } catch {
    return res.status(502).json({ message: "Google OAuth request failed" });
  }
});

// POST /auth/cli/init — CLI calls this to start browser login
router.post("/cli/init", authLimiter, async (req, res) => {
  const token = crypto.randomBytes(16).toString("hex");

  await prisma.cliToken.create({ data: { token } });

  return res.json({ token });
});

// GET /auth/cli/poll — CLI polls this waiting for JWT
router.get("/cli/poll", authLimiter, async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Token required" });
  }

  const record = await prisma.cliToken.findUnique({ where: { token } });

  if (!record) {
    return res.status(404).json({ message: "Token not found" });
  }

  if (!record.jwt) {
    return res.json({ status: "pending" });
  }

  // delete after use
  await prisma.cliToken.delete({ where: { token } });

  return res.json({ status: "authorized", jwt: record.jwt });
});

// POST /auth/cli/confirm — website calls this after user logs in
router.post("/cli/confirm", authLimiter, async (req, res) => {
  const { token, jwt: jwtValue } = req.body;

  if (!token || !jwtValue) {
    return res.status(400).json({ message: "Token and jwt required" });
  }

  try {
    verifyToken(jwtValue);
  } catch {
    return res.status(400).json({ message: "Invalid jwt value" });
  }

  const record = await prisma.cliToken.findUnique({ where: { token } });

  if (!record) {
    return res.status(404).json({ message: "Token not found" });
  }

  await prisma.cliToken.update({
    where: { token },
    data: { jwt: jwtValue, used: true },
  });

  return res.json({ success: true });
});

export default router;
