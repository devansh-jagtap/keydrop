"use client";

import Link from "next/link";
import CodeBlock from "@/components/docs/code-block";

const platforms = [
  { name: "Vercel", note: "Set KEYDROP_KEY and use npx keydrop run -- next build" },
  { name: "Railway", note: "Add KEYDROP_KEY in project environment variables" },
  { name: "Docker", note: "Pass KEYDROP_KEY via -e KEYDROP_KEY=proj_xxx" },
  { name: "AWS ECS", note: "Add KEYDROP_KEY to task definition environment variables" },
  { name: "Heroku", note: "heroku config:set KEYDROP_KEY=proj_xxx" },
  { name: "Fly.io", note: "fly secrets set KEYDROP_KEY=proj_xxx" },
];

export default function DeploymentPage() {
  return (
    <>
      <div style={{ marginBottom: "48px" }}>
        <p style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "12px", fontFamily: "var(--font-sans)" }}>
          Guides
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: "700", letterSpacing: "-0.04em", lineHeight: "1.15", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          Deploy Anywhere
        </h1>
        <p style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
          Store only one environment variable on your deployment platform.
        </p>
      </div>

      <section id="the-basics" style={{ marginBottom: "48px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          The Basics
        </h2>
        <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          After running keydrop push, store only:
        </p>
        <CodeBlock code="KEYDROP_KEY=proj_xxxxxxxxx" language="env" />
      </section>

      <section id="vercel" style={{ marginBottom: "48px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          Vercel
        </h2>
        <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          Verified on Vercel deployments.
        </p>

        <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "10px", fontFamily: "var(--font-sans)" }}>Environment Variable</p>
        <div style={{ marginBottom: "20px" }}>
          <CodeBlock code="KEYDROP_KEY=proj_xxxxxxxxx" language="env" />
        </div>

        <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "10px", fontFamily: "var(--font-sans)" }}>Build Command</p>
        <div style={{ marginBottom: "20px" }}>
          <CodeBlock code="npx keydrop run -- next build" language="bash" />
        </div>

        <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "10px", fontFamily: "var(--font-sans)" }}>Runtime</p>
        <CodeBlock code={`import { init } from "keydrop";\n\nawait init();`} language="typescript" />
      </section>

      <section id="platforms" style={{ marginBottom: "48px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          Other Platforms
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
          {platforms.map((platform) => (
            <div key={platform.name} style={{ padding: "16px", borderRadius: "10px", background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "600", color: "var(--text)", marginBottom: "8px", fontFamily: "var(--font-sans)" }}>{platform.name}</h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0, fontFamily: "var(--font-sans)" }}>{platform.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="runtime" style={{ marginBottom: "48px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          Runtime in Production
        </h2>
        <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          Use keydrop run during builds. Call init() at runtime so secrets load into process.env when your app starts.
        </p>
        <CodeBlock code={`import { init } from "keydrop";\n\nawait init();`} language="typescript" />
      </section>

     <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "12px",
    borderTop: "1px solid var(--border)",
    paddingTop: "24px",
  }}
>
        <Link href="/docs/frameworks" style={{ color: "var(--text-secondary)", fontSize: "14px", textDecoration: "none", fontFamily: "var(--font-sans)" }}>
          ← Framework Support
        </Link>
        <Link href="/docs/cli" style={{ color: "var(--accent)", fontSize: "14px", fontWeight: "500", textDecoration: "none", fontFamily: "var(--font-sans)" }}>
          CLI Reference →
        </Link>
      </div>
    </>
  );
}
