import fs from "fs";
import path from "path";
import axios from "axios";
import { exec } from "child_process";

const API_URL = process.env.KEYDROP_API_URL || "https://keydrop-1wzo.onrender.com";
const WEBSITE_URL = process.env.KEYDROP_WEBSITE_URL || "https://keydrops.tech";
const CONFIG_DIR = path.join(process.env.HOME || process.env.USERPROFILE, ".keydrop");
const CONFIG_PATH = path.join(CONFIG_DIR, "config.json");

function openBrowser(url) {
  const platform = process.platform;
  const cmd =
    platform === "win32" ? `start "" "${url}"` :
    platform === "darwin" ? `open "${url}"` :
    `xdg-open "${url}"`;
  exec(cmd, (err) => {
    if (err) console.log(`\nCouldn't open browser automatically. Open manually:\n${url}\n`);
  });
}

export async function loginCommand() {
  console.log(" Logging in to KeyDrop...\n");

  let cliToken;
  try {
    const res = await axios.post(`${API_URL}/auth/cli/init`);
    cliToken = res.data.token;
  } catch (err) {
    console.error(" Failed to connect to KeyDrop API:", err.message);
    process.exit(1);
  }

  const loginUrl = `${WEBSITE_URL}/auth/cli?token=${cliToken}`;
  console.log(`Opening browser to complete login...`);
  console.log(`\n  ${loginUrl}\n`);
  console.log(`If browser didn't open, copy the URL above.\n`);
  openBrowser(loginUrl);

  console.log(" Waiting for you to login in the browser...");

  let jwt = null;
  let attempts = 0;

  while (!jwt && attempts < 60) {
    await new Promise((r) => setTimeout(r, 2000));
    attempts++;
    try {
      const res = await axios.get(`${API_URL}/auth/cli/poll?token=${cliToken}`);
      if (res.data.status === "authorized") {
        jwt = res.data.jwt;
        break;
      }
    } catch {}
  }

  if (!jwt) {
    console.error(" Login timed out. Please try again.");
    process.exit(1);
  }

  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
  fs.writeFileSync(CONFIG_PATH, JSON.stringify({ token: jwt, loggedInAt: new Date().toISOString() }, null, 2));

  console.log(`\n Logged in successfully!\n`);
}

export async function logoutCommand() {
  if (fs.existsSync(CONFIG_PATH)) {
    fs.unlinkSync(CONFIG_PATH);
  }
  console.log(" Logged out successfully.");
}