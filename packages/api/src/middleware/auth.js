import { verifyToken } from "../lib/jwt.js";
import { getOrCreateUserFromClerkToken } from "../lib/clerk.js";

export async function requireAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const payload = verifyToken(token);
    req.user = payload;
    return next();
  } catch {
    try {
      const user = await getOrCreateUserFromClerkToken(token);
      req.user = { userId: user.id, email: user.email, clerkId: user.clerkId };
      return next();
    } catch (error) {
      console.error("Clerk authentication failed:", error.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }
}
