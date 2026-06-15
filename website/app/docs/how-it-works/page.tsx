"use client";

import Link from "next/link";
import CodeBlock from "@/components/docs/code-block";

const verified = [
  "keydrop push",
  "keydrop pull",
  "keydrop run",
  "Runtime secret injection",
  "Build-time secret injection",
  "Next.js",
  "Vercel",
  "NEXT_PUBLIC variables",
  "Single KEYDROP_KEY deployment workflow",
];

export default function HowItWorksPage() {
  return (
    <>
      <div style={{ marginBottom: "48px" }}>
        <p style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "12px", fontFamily: "var(--font-sans)" }}>
          Understanding
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: "700", letterSpacing: "-0.04em", lineHeight: "1.15", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          How It Works
        </h1>
        <p style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
          Three steps. That&apos;s all.
        </p>
      </div>

      <section id="install" style={{ marginBottom: "56px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", marginBottom: "8px", fontFamily: "var(--font-sans)" }}>
          01. Install
        </h2>
        <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          Install both the KeyDrop CLI and SDK.
        </p>
        <div style={{ marginBottom: "16px" }}>
          <CodeBlock code={`npm install keydrop\nnpm install -g keydrop-cli`} language="bash" />
        </div>
        <ul style={{ margin: 0, padding: "0 0 0 20px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <li style={{ fontSize: "15px", lineHeight: "1.6", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
            The CLI handles secret management and build-time injection.
          </li>
          <li style={{ fontSize: "15px", lineHeight: "1.6", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
            The SDK handles runtime secret loading.
          </li>
        </ul>
      </section>

      <section id="push" style={{ marginBottom: "56px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", marginBottom: "8px", fontFamily: "var(--font-sans)" }}>
          02. Push
        </h2>
        <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          Upload your existing .env file.
        </p>
        <div style={{ marginBottom: "24px" }}>
          <CodeBlock code={`keydrop login\nkeydrop push`} language="bash" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
          <div>
            <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "10px", fontFamily: "var(--font-sans)" }}>Before</p>
            <CodeBlock
              code={`DATABASE_URL=...\nJWT_SECRET=...\nOPENAI_API_KEY=...\nSTRIPE_SECRET_KEY=...`}
              language="env"
            />
          </div>
          <div>
            <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "10px", fontFamily: "var(--font-sans)" }}>After</p>
            <CodeBlock code="KEYDROP_KEY=proj_xxxxxxxxx" language="env" />
          </div>
        </div>
        <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text-secondary)", marginTop: "16px", fontFamily: "var(--font-sans)" }}>
          Your secrets are securely stored and replaced with a single project key.
        </p>
      </section>

      <section id="run" style={{ marginBottom: "56px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", marginBottom: "8px", fontFamily: "var(--font-sans)" }}>
          03. Run
        </h2>
        <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "20px", fontFamily: "var(--font-sans)" }}>
          Use KeyDrop to inject secrets during development and builds.
        </p>

        <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "10px", fontFamily: "var(--font-sans)" }}>Development</p>
        <div style={{ marginBottom: "20px" }}>
          <CodeBlock code="keydrop run -- npm run dev" language="bash" />
        </div>

        <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "10px", fontFamily: "var(--font-sans)" }}>Build</p>
        <div style={{ marginBottom: "20px" }}>
          <CodeBlock code="keydrop run -- next build" language="bash" />
        </div>

        <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "10px", fontFamily: "var(--font-sans)" }}>Runtime</p>
        <div style={{ marginBottom: "16px" }}>
          <CodeBlock code={`import { init } from "keydrop";\n\nawait init();`} language="typescript" filename="app startup" />
        </div>
        <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
          Secrets are automatically loaded into <code style={{ fontFamily: "var(--font-mono)", background: "var(--bg-secondary)", padding: "2px 6px", borderRadius: "4px", fontSize: "13px" }}>process.env</code>.
        </p>
      </section>

      <section id="behind-the-scenes" style={{ marginBottom: "56px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          What Happens Behind The Scenes
        </h2>
        <CodeBlock
          code={`Your .env
↓
keydrop push
↓
Secrets stored securely
↓
KEYDROP_KEY generated
↓
Deployment receives KEYDROP_KEY
↓
keydrop run injects build-time secrets
↓
init() loads runtime secrets
↓
Application runs normally`}
          language="text"
        />
      </section>

      <section id="verified" style={{ marginBottom: "48px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          What Has Been Verified
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "10px" }}>
          {verified.map((item) => (
            <li
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 14px",
                borderRadius: "10px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                fontSize: "14px",
                color: "var(--text-secondary)",
                fontFamily: "var(--font-sans)",
              }}
            >
              <span style={{ color: "var(--accent)" }}>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border)", paddingTop: "24px" }}>
        <Link href="/docs" style={{ color: "var(--text-secondary)", fontSize: "14px", textDecoration: "none", fontFamily: "var(--font-sans)" }}>
          ← Introduction
        </Link>
        <Link href="/docs/getting-started" style={{ color: "var(--accent)", fontSize: "14px", fontWeight: "500", textDecoration: "none", fontFamily: "var(--font-sans)" }}>
          Quick Start →
        </Link>
      </div>
    </>
  );
}
