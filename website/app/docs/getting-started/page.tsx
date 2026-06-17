"use client";

import Link from "next/link";
import CodeBlock from "@/components/docs/code-block";

export default function GettingStartedPage() {
  return (
    <>
      <div style={{ marginBottom: "48px" }}>
        <p style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "12px", fontFamily: "var(--font-sans)" }}>
          Getting Started
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: "700", letterSpacing: "-0.04em", lineHeight: "1.15", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          Quick Start
        </h1>
        <p style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
          Get started in minutes.
        </p>
      </div>

      <section id="install" style={{ marginBottom: "40px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", color: "var(--text)", marginBottom: "12px", fontFamily: "var(--font-sans)" }}>Install</h2>
        <CodeBlock code={`npm install keydrop\nnpm install -g keydrop-cli`} language="bash" />
      </section>

      <section id="login" style={{ marginBottom: "40px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", color: "var(--text)", marginBottom: "12px", fontFamily: "var(--font-sans)" }}>Login</h2>
        <CodeBlock code="keydrop login" language="bash" />
      </section>

      <section id="upload" style={{ marginBottom: "40px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", color: "var(--text)", marginBottom: "12px", fontFamily: "var(--font-sans)" }}>Upload secrets</h2>
        <CodeBlock code="keydrop push" language="bash" />
        <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text-secondary)", marginTop: "16px", fontFamily: "var(--font-sans)" }}>Result:</p>
        <div style={{ marginTop: "12px" }}>
          <CodeBlock code="KEYDROP_KEY=proj_xxxxxxxxx" language="env" />
        </div>
      </section>

      <section id="run" style={{ marginBottom: "48px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", color: "var(--text)", marginBottom: "12px", fontFamily: "var(--font-sans)" }}>Run your application</h2>
        <CodeBlock code="keydrop run -- npm run dev" language="bash" />
      </section>

      <section id="next-steps" style={{ marginBottom: "48px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>Next Steps</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
          {[
            { label: "Framework Support", href: "/docs/frameworks" },
            { label: "Deploy Anywhere", href: "/docs/deployment" },
            { label: "CLI Commands", href: "/docs/cli" },
            { label: "SDK Reference", href: "/docs/sdk" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                borderRadius: "10px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                textDecoration: "none",
                transition: "border-color 0.2s",
              }}
            >
              <span style={{ fontSize: "14px", color: "var(--text)", fontFamily: "var(--font-sans)" }}>{item.label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          ))}
        </div>
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
        <Link href="/docs/how-it-works" style={{ color: "var(--text-secondary)", fontSize: "14px", textDecoration: "none", fontFamily: "var(--font-sans)" }}>
          ← How It Works
        </Link>
        <Link href="/docs/frameworks" style={{ color: "var(--accent)", fontSize: "14px", fontWeight: "500", textDecoration: "none", fontFamily: "var(--font-sans)" }}>
          Framework Support →
        </Link>
      </div>
    </>
  );
}
