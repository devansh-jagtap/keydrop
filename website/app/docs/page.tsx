"use client";

import Link from "next/link";

const toc = [
  { id: "what-is-keydrop", title: "What is KeyDrop?", level: 2 },
  { id: "why-keydrop", title: "Why KeyDrop?", level: 2 },
  { id: "quick-start", title: "Quick Start", level: 2 },
];

export default function DocsPage() {
  return (
    <>
      <div style={{ marginBottom: "48px" }}>
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
          Introduction
        </h1>
        <p
          style={{
            fontSize: "17px",
            lineHeight: "1.7",
            color: "var(--text-secondary)",
            fontFamily: "var(--font-sans)",
          }}
        >
          Turn your entire .env file into a single deployable key. No code changes required.
        </p>
      </div>

      <section id="what-is-keydrop" style={{ marginBottom: "48px", scrollMarginTop: "100px" }}>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "var(--text)",
            marginBottom: "16px",
            fontFamily: "var(--font-sans)",
          }}
        >
          What is KeyDrop?
        </h2>
        <p
          style={{
            fontSize: "15px",
            lineHeight: "1.7",
            color: "var(--text-secondary)",
            marginBottom: "16px",
            fontFamily: "var(--font-sans)",
          }}
        >
          KeyDrop is a secrets management tool that replaces your .env file with a single environment variable. 
          Instead of managing dozens of secret keys across your team and deployment platforms, you manage one key 
          that contains everything.
        </p>
        <div
          style={{
            padding: "20px 24px",
            borderRadius: "12px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <div style={{ marginBottom: "32px" }}>
            <p
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "var(--text-muted)",
                marginBottom: "12px",
                fontFamily: "var(--font-sans)",
              }}
            >
              Before
            </p>
            <pre
              style={{
                margin: 0,
                padding: "16px",
                borderRadius: "8px",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                lineHeight: "1.6",
                color: "var(--text-secondary)",
              }}
            >
{`MONGO_URI=mongodb://...
JWT_SECRET=abc123
STRIPE_KEY=sk_test_xxx
OPENAI_KEY=sk-xxxx
REDIS_URL=redis://...`}
            </pre>
          </div>
          <div>
            <p
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "var(--text-muted)",
                marginBottom: "12px",
                fontFamily: "var(--font-sans)",
              }}
            >
              After
            </p>
            <pre
              style={{
                margin: 0,
                padding: "16px",
                borderRadius: "8px",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                lineHeight: "1.6",
              }}
            >
              <span style={{ color: "var(--text-secondary)" }}>KEYDROP_KEY=</span>
              <span style={{ color: "var(--accent)" }}>proj_x82js8sh</span>
            </pre>
          </div>
        </div>
      </section>

      <section id="why-keydrop" style={{ marginBottom: "48px", scrollMarginTop: "100px" }}>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "var(--text)",
            marginBottom: "16px",
            fontFamily: "var(--font-sans)",
          }}
        >
          Why KeyDrop?
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {[
            { title: "Zero Code Changes", desc: "No SDK required. Just prefix your commands with keydrop run and your secrets are automatically injected." },
            { title: "AES-256 Encryption", desc: "Your secrets are encrypted locally before ever leaving your machine. We never see your plaintext values." },
            { title: "Deploy Anywhere", desc: "Works with Vercel, Railway, Docker, AWS, and any platform that supports environment variables." },
            { title: "Team Collaboration", desc: "Share secrets securely with your team. Manage permissions and audit access from the dashboard." },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                padding: "20px",
                borderRadius: "10px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "var(--text)",
                  marginBottom: "8px",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="quick-start" style={{ marginBottom: "48px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          Quick Start
        </h2>
        <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "20px", fontFamily: "var(--font-sans)" }}>
          Get up and running in under a minute.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text)", marginBottom: "8px", fontFamily: "var(--font-sans)" }}>
              1. Install the CLI
            </p>
            <div
              style={{
                padding: "14px 18px",
                borderRadius: "10px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <code style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--accent)" }}>
                npm install -g keydrop-cli@latest
              </code>
            </div>
          </div>

          <div>
            <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text)", marginBottom: "8px", fontFamily: "var(--font-sans)" }}>
              2. Authenticate
            </p>
            <div
              style={{
                padding: "14px 18px",
                borderRadius: "10px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <code style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--accent)" }}>
                keydrop login
              </code>
            </div>
          </div>

          <div>
            <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text)", marginBottom: "8px", fontFamily: "var(--font-sans)" }}>
              3. Push your secrets
            </p>
            <div
              style={{
                padding: "14px 18px",
                borderRadius: "10px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <code style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--accent)" }}>
                keydrop push
              </code>
            </div>
          </div>

          <div>
            <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text)", marginBottom: "8px", fontFamily: "var(--font-sans)" }}>
              4. Run your app
            </p>
            <div
              style={{
                padding: "14px 18px",
                borderRadius: "10px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <code style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--accent)" }}>
                keydrop run -- npm start
              </code>
            </div>
          </div>
        </div>
      </section>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          borderTop: "1px solid var(--border)",
          paddingTop: "24px",
          marginTop: "48px",
        }}
      >
        <Link
          href="/docs/getting-started"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--accent)",
            fontSize: "14px",
            fontWeight: "500",
            textDecoration: "none",
            fontFamily: "var(--font-sans)",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Quick Start Guide
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
    </>
  );
}
