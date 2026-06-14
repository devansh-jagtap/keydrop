"use client";

const platforms = [
  {
    name: "Vercel",
    envVar: "KEYDROP_KEY",
    docs: "Add KEYDROP_KEY to your Vercel project environment variables.",
  },
  {
    name: "Railway",
    envVar: "KEYDROP_KEY",
    docs: "Add a new variable KEYDROP_KEY in your Railway project settings.",
  },
  {
    name: "Docker",
    envVar: "KEYDROP_KEY",
    docs: "Pass the key via -e flag: docker run -e KEYDROP_KEY=proj_xxx",
  },
  {
    name: "AWS ECS",
    envVar: "KEYDROP_KEY",
    docs: "Add KEYDROP_KEY to your task definition environment variables.",
  },
  {
    name: "Heroku",
    envVar: "KEYDROP_KEY",
    docs: "Use heroku config:set KEYDROP_KEY=proj_xxx",
  },
  {
    name: "Fly.io",
    envVar: "KEYDROP_KEY",
    docs: "Use fly secrets set KEYDROP_KEY=proj_xxx",
  },
];

export default function DeploymentPage() {
  return (
    <>
      <div style={{ marginBottom: "48px" }}>
        <p
          style={{
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: "12px",
            fontFamily: "var(--font-sans)",
          }}
        >
          Guides
        </p>
        <h1
          style={{
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: "700",
            letterSpacing: "-0.04em",
            lineHeight: "1.15",
            color: "var(--text)",
            marginBottom: "16px",
            fontFamily: "var(--font-sans)",
          }}
        >
          Deployment Guide
        </h1>
        <p
          style={{
            fontSize: "17px",
            lineHeight: "1.7",
            color: "var(--text-secondary)",
            fontFamily: "var(--font-sans)",
          }}
        >
          Deploy your project key to any platform that supports environment variables.
        </p>
      </div>

      <section id="the-basics" style={{ marginBottom: "48px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          The Basics
        </h2>
        <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          After running <code style={{ fontFamily: "var(--font-mono)", background: "var(--bg-secondary)", padding: "2px 6px", borderRadius: "4px", fontSize: "13px" }}>keydrop push</code>, you will receive a project key like:
        </p>
        <div
          style={{
            padding: "14px 18px",
            borderRadius: "10px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            width: "fit-content",
          }}
        >
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "14px" }}>
            <span style={{ color: "var(--text-secondary)" }}>KEYDROP_KEY=</span>
            <span style={{ color: "var(--accent)" }}>proj_x82js8sh</span>
          </code>
        </div>
      </section>

      <section id="platforms" style={{ marginBottom: "48px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          Supported Platforms
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "12px" }}>
          {platforms.map((platform) => (
            <div
              key={platform.name}
              style={{
                padding: "16px",
                borderRadius: "10px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <h3 style={{ fontSize: "15px", fontWeight: "600", color: "var(--text)", fontFamily: "var(--font-sans)" }}>
                  {platform.name}
                </h3>
                <code style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--accent)", background: "var(--bg)", padding: "4px 8px", borderRadius: "4px" }}>
                  {platform.envVar}
                </code>
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
                {platform.docs}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="production" style={{ marginBottom: "48px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          Production Setup
        </h2>
        <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          For production, use the project key directly. No CLI needed at runtime.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ padding: "14px 18px", borderRadius: "10px", background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <p style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "8px", fontFamily: "var(--font-sans)" }}>
              Step 1
            </p>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
              Set <code style={{ fontFamily: "var(--font-mono)", background: "var(--bg)", padding: "2px 6px", borderRadius: "4px", fontSize: "13px" }}>KEYDROP_KEY</code> in your deployment platform environment variables.
            </p>
          </div>
          <div style={{ padding: "14px 18px", borderRadius: "10px", background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <p style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "8px", fontFamily: "var(--font-sans)" }}>
              Step 2
            </p>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
              Use the SDK or <code style={{ fontFamily: "var(--font-mono)", background: "var(--bg)", padding: "2px 6px", borderRadius: "4px", fontSize: "13px" }}>keydrop run</code> to decrypt secrets at startup.
            </p>
          </div>
          <div style={{ padding: "14px 18px", borderRadius: "10px", background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <p style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "8px", fontFamily: "var(--font-sans)" }}>
              Step 3
            </p>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
              Your app reads secrets from <code style={{ fontFamily: "var(--font-mono)", background: "var(--bg)", padding: "2px 6px", borderRadius: "4px", fontSize: "13px" }}>process.env</code> normally.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
