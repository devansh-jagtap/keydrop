"use client";

import Link from "next/link";
import CodeBlock from "@/components/docs/code-block";

export default function DocsPage() {
  return (
    <>
      <div style={{ marginBottom: "48px" }}>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: "700", letterSpacing: "-0.04em", lineHeight: "1.15", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          Introduction
        </h1>
        <p style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
          Turn your entire .env into one deployable key. Use the CLI for secret management and build-time injection. Use the SDK for runtime loading.
        </p>
      </div>

      <section id="why-keydrop" style={{ marginBottom: "56px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          Why KeyDrop
        </h2>
        <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "20px", fontFamily: "var(--font-sans)" }}>
          Traditional deployment requires copying every secret to every platform:
        </p>
        <div style={{ marginBottom: "24px" }}>
          <CodeBlock
            code={`DATABASE_URL=...\nJWT_SECRET=...\nOPENAI_API_KEY=...\nSTRIPE_SECRET_KEY=...\nNEXTAUTH_SECRET=...`}
            language="env"
            filename="Traditional deployment"
          />
        </div>
        <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "20px", fontFamily: "var(--font-sans)" }}>
          With KeyDrop:
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
          <CodeBlock code="keydrop push" language="bash" />
          <div style={{ textAlign: "center", color: "var(--text-muted)", fontFamily: "var(--font-sans)", fontSize: "14px" }}>↓</div>
          <CodeBlock code="KEYDROP_KEY=proj_xxxxxxxxx" language="env" />
          <div style={{ textAlign: "center", color: "var(--text-muted)", fontFamily: "var(--font-sans)", fontSize: "14px" }}>↓</div>
          <p style={{ textAlign: "center", fontSize: "15px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", margin: 0 }}>Deploy</p>
        </div>
        <div style={{ padding: "20px 24px", borderRadius: "12px", background: "rgba(34, 211, 165, 0.06)", border: "1px solid rgba(34, 211, 165, 0.15)" }}>
          <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text)", margin: 0, fontFamily: "var(--font-sans)" }}>
            One key. One project. Deploy anywhere.
          </p>
        </div>
      </section>

      <section id="overview" style={{ marginBottom: "48px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          At a Glance
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
          {[
            { title: "CLI", desc: "Manage secrets, push .env files, and inject secrets at build time with keydrop run." },
            { title: "SDK", desc: "Load secrets at runtime with init(). Secrets end up in process.env automatically." },
            { title: "One Key", desc: "Deploy with only KEYDROP_KEY on Vercel, Railway, Docker, AWS, and more." },
          ].map((item) => (
            <div key={item.title} style={{ padding: "20px", borderRadius: "12px", background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "600", color: "var(--text)", marginBottom: "8px", fontFamily: "var(--font-sans)" }}>{item.title}</h3>
              <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--text-secondary)", margin: 0, fontFamily: "var(--font-sans)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ display: "flex", justifyContent: "flex-end", borderTop: "1px solid var(--border)", paddingTop: "24px" }}>
        <Link href="/docs/how-it-works" style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent)", fontSize: "14px", fontWeight: "500", textDecoration: "none", fontFamily: "var(--font-sans)" }}>
          How It Works
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
    </>
  );
}
