"use client";

interface Command {
  label?: string;
  code: string;
}

interface Step {
  title: string;
  description: string;
  commands: Command[];
}

const steps: Step[] = [
  {
    title: "Install the CLI",
    description: "Install KeyDrop globally using npm or yarn.",
    commands: [
      { label: "npm", code: "npm install -g keydrop-cli@latest" },
      { label: "yarn", code: "yarn global add keydrop-cli@latest" },
    ],
  },
  {
    title: "Create a project",
    description: "From your project root, run push to encrypt and upload your .env file.",
    commands: [
      { code: "keydrop push" },
    ],
  },
  {
    title: "Run your app",
    description: "Use keydrop run to execute any command with your secrets injected.",
    commands: [
      { code: "keydrop run -- npm run dev" },
      { code: "keydrop run -- next build" },
      { code: "keydrop run -- yarn start" },
    ],
  },
];

export default function GettingStartedPage() {
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
          Getting Started
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
          Quick Start
        </h1>
        <p
          style={{
            fontSize: "17px",
            lineHeight: "1.7",
            color: "var(--text-secondary)",
            fontFamily: "var(--font-sans)",
          }}
        >
          Get started with KeyDrop in three simple steps. No SDK required.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginBottom: "48px" }}>
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              padding: "24px",
              borderRadius: "12px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "6px",
                  background: "var(--accent)",
                  color: "#080808",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "700",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {index + 1}
              </span>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "var(--text)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {step.title}
              </h2>
            </div>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.6",
                color: "var(--text-secondary)",
                marginBottom: "16px",
                marginLeft: "40px",
                fontFamily: "var(--font-sans)",
              }}
            >
              {step.description}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginLeft: "40px" }}>
              {step.commands.map((cmd, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {cmd.label && (
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        fontFamily: "var(--font-sans)",
                        minWidth: "50px",
                      }}
                    >
                      {cmd.label}
                    </span>
                  )}
                  <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "13px" }}>
                    $
                  </span>
                  <code style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "14px" }}>
                    {cmd.code}
                  </code>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <section id="deployment" style={{ marginBottom: "40px", scrollMarginTop: "100px" }}>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "var(--text)",
            marginBottom: "16px",
            fontFamily: "var(--font-sans)",
          }}
        >
          Deploy your key
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
          After pushing, you&apos;ll receive a project key. Set it as an environment variable on your deployment platform:
        </p>
        <div
          style={{
            padding: "14px 18px",
            borderRadius: "10px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "14px" }}>
            <span style={{ color: "var(--text-secondary)" }}>KEYDROP_KEY=</span>
            <span style={{ color: "var(--accent)" }}>proj_x82js8sh</span>
          </code>
        </div>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <div
          style={{
            padding: "20px 24px",
            borderRadius: "12px",
            background: "rgba(34, 211, 165, 0.06)",
            border: "1px solid rgba(34, 211, 165, 0.15)",
          }}
        >
          <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <h3
              style={{
                fontSize: "15px",
                fontWeight: "600",
                color: "var(--text)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Works with your existing workflow
            </h3>
          </div>
          <p
            style={{
              fontSize: "14px",
              lineHeight: "1.6",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Use <code style={{ fontFamily: "var(--font-mono)", background: "var(--bg)", padding: "2px 6px", borderRadius: "4px", fontSize: "13px" }}>keydrop run</code> in development, 
            or set <code style={{ fontFamily: "var(--font-mono)", background: "var(--bg)", padding: "2px 6px", borderRadius: "4px", fontSize: "13px" }}>KEYDROP_KEY</code> in production. 
            No SDK required, no code changes.
          </p>
        </div>
      </section>

      <section id="next-steps" style={{ scrollMarginTop: "100px" }}>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "var(--text)",
            marginBottom: "16px",
            fontFamily: "var(--font-sans)",
          }}
        >
          Next Steps
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
          <a
            href="/docs/cli"
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
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-strong)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <span style={{ fontSize: "14px", color: "var(--text)", fontFamily: "var(--font-sans)" }}>
              CLI Commands
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
          <a
            href="/docs/sdk"
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
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-strong)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <span style={{ fontSize: "14px", color: "var(--text)", fontFamily: "var(--font-sans)" }}>
              SDK Reference
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
