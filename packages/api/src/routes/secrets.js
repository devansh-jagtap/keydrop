import { Router } from "express";
import crypto from "crypto";
import { prisma } from "../lib/prisma.js";
import { encrypt, decrypt } from "../lib/crypto.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// POST /upload — requires auth
router.post("/upload", requireAuth, async (req, res) => {
  const { secrets, name } = req.body;

  if (!secrets || typeof secrets !== "object") {
    return res.status(400).json({ message: "Invalid secrets payload" });
  }

  const projectKey = "proj_" + crypto.randomBytes(24).toString("hex");
  const encryptedData = encrypt(JSON.stringify(secrets));

  await prisma.project.create({
    data: {
      projectKey,
      encryptedData,
      name: name || "Untitled Project",
      userId: req.user.userId,
    },
  });

  return res.json({ projectKey });
});

// PUT /upload — requires auth
router.put("/upload", requireAuth, async (req, res) => {
  const { secrets, projectKey } = req.body;

  if (!projectKey) {
    return res.status(400).json({ message: "projectKey required" });
  }

  if (!secrets || typeof secrets !== "object") {
    return res.status(400).json({ message: "Invalid secrets payload" });
  }

  const project = await prisma.project.findUnique({ where: { projectKey } });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (project.userId !== req.user.userId) {
    return res.status(403).json({ message: "Not your project" });
  }

  const encryptedData = encrypt(JSON.stringify(secrets));
  await prisma.project.update({
    where: { projectKey },
    data: { encryptedData },
  });

  return res.json({ projectKey });
});

// GET /secrets — public, SDK uses this
router.get("/secrets", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const projectKey = authHeader?.replace("Bearer ", "");

  if (!projectKey) {
    return res.status(401).json({ message: "Missing KEYDROP_KEY" });
  }

  const project = await prisma.project.findUnique({ where: { projectKey } });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const secrets = JSON.parse(decrypt(project.encryptedData));
  return res.json({ secrets });
});

// GET /projects — requires auth
router.get("/projects", requireAuth, async (req, res) => {
  const projects = await prisma.project.findMany({
    where: { userId: req.user.userId },
    select: {
      id: true,
      projectKey: true,
      name: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return res.json({ projects });
});

// DELETE /project/:key — requires auth
router.delete("/project/:key", requireAuth, async (req, res) => {
  const { key } = req.params;

  const project = await prisma.project.findUnique({ where: { projectKey: key } });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (project.userId !== req.user.userId) {
    return res.status(403).json({ message: "Not your project" });
  }

  await prisma.project.delete({ where: { projectKey: key } });

  return res.json({ success: true });
});
// PUT /project/:key/secret
router.put("/project/:key/secret", requireAuth, async (req, res) => {
  const { key } = req.params;
  const { secretKey, value } = req.body;

  const project = await prisma.project.findUnique({
    where: { projectKey: key },
  });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (project.userId !== req.user.userId) {
    return res.status(403).json({ message: "Not your project" });
  }

  const secrets = JSON.parse(decrypt(project.encryptedData));

  secrets[secretKey] = value;

  const encryptedData = encrypt(JSON.stringify(secrets));

  await prisma.project.update({
    where: { projectKey: key },
    data: { encryptedData },
  });

  return res.json({ success: true });
});
export default router;