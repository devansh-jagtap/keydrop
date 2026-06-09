import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import axios from "axios";

const API_URL = process.env.KEYDROP_API_URL || "https://keydrop-1wzo.onrender.com";

function getKeyFromEnv() {
  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const raw = fs.readFileSync(envPath, "utf-8");
      const match = raw.match(/KEYDROP_KEY=(.+)/);
      return match?.[1]?.trim();
    }
  } catch {}
  return null;
}

export async function runCommand(args) {
  if (!args || args.length === 0) {
    console.error(" Usage: keydrop run -- <command>");
    console.error("   Example: keydrop run -- next build");
    process.exit(1);
  }

  const keydropKey = process.env.KEYDROP_KEY || getKeyFromEnv();

  if (!keydropKey) {
    console.error("No KEYDROP_KEY found in environment or .env file");
    process.exit(1);
  }

  console.log(" Fetching secrets from KeyDrop...");

  let secrets;
  try {
    const res = await axios.get(`${API_URL}/secrets`, {
      headers: { Authorization: `Bearer ${keydropKey}` },
    });
    secrets = res.data.secrets;
  } catch (err) {
    console.error("Failed to fetch secrets:", err.response?.data?.message || err.message);
    process.exit(1);
  }

  const env = { ...process.env, ...secrets };
  const [cmd, ...cmdArgs] = args;

  console.log(` Running: ${cmd} ${cmdArgs.join(" ")}\n`);

  const child = spawn(cmd, cmdArgs, {
    env,
    stdio: "inherit",
    shell: true,
  });

  child.on("exit", (code) => process.exit(code ?? 0));
}
