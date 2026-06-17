"use client";

import Link from "next/link";
import CodeBlock from "@/components/docs/code-block";

export default function FrameworksPage() {
  return (
    <>
      <div style={{ marginBottom: "48px" }}>
        <p style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "12px", fontFamily: "var(--font-sans)" }}>
          Guides
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: "700", letterSpacing: "-0.04em", lineHeight: "1.15", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          Framework Support
        </h1>
        <p style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
          Use keydrop run for build-time injection. Use init() for runtime loading.
        </p>
      </div>

      <section id="nextjs" style={{ marginBottom: "56px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          Next.js
        </h2>

        <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "10px", fontFamily: "var(--font-sans)" }}>Build-time secret injection</p>
        <div style={{ marginBottom: "24px" }}>
          <CodeBlock code="keydrop run -- next build" language="bash" />
        </div>

        <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "10px", fontFamily: "var(--font-sans)" }}>Runtime secret loading</p>
        <div style={{ marginBottom: "20px" }}>
          <CodeBlock code={`import { init } from "keydrop";\n\nawait init();`} language="typescript" />
        </div>

        <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "12px", fontFamily: "var(--font-sans)" }}>Verified with:</p>
        <ul style={{ margin: 0, padding: "0 0 0 20px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {["Next.js", "Vercel", "App Router", "NEXT_PUBLIC variables"].map((item) => (
            <li key={item} style={{ fontSize: "15px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>{item}</li>
          ))}
        </ul>
      </section>

      <section id="nodejs" style={{ marginBottom: "48px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          Node.js
        </h2>

        <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "10px", fontFamily: "var(--font-sans)" }}>Runtime secret loading</p>
        <div style={{ marginBottom: "24px" }}>
          <CodeBlock code={`import { init } from "keydrop";\n\nawait init();`} language="typescript" />
        </div>

        <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "10px", fontFamily: "var(--font-sans)" }}>Development</p>
        <div style={{ marginBottom: "20px" }}>
          <CodeBlock code="keydrop run -- npm start" language="bash" />
        </div>

        <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "12px", fontFamily: "var(--font-sans)" }}>Works with:</p>
        <ul style={{ margin: 0, padding: "0 0 0 20px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {["Express", "Fastify", "Hono", "NestJS"].map((item) => (
            <li key={item} style={{ fontSize: "15px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>{item}</li>
          ))}
        </ul>
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
        <Link href="/docs/getting-started" style={{ color: "var(--text-secondary)", fontSize: "14px", textDecoration: "none", fontFamily: "var(--font-sans)" }}>
          ← Quick Start
        </Link>
        <Link href="/docs/deployment" style={{ color: "var(--accent)", fontSize: "14px", fontWeight: "500", textDecoration: "none", fontFamily: "var(--font-sans)" }}>
          Deploy Anywhere →
        </Link>
      </div>
    </>
  );
}
