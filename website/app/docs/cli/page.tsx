"use client";

const commands = [
  {
    name: "login",
    id: "login",
    description: "Authenticate with KeyDrop using your browser. This stores a session token locally.",
    usage: "keydrop login",
    examples: ["keydrop login"],
    options: [],
  },
  {
    name: "push",
    id: "push",
    description: "Encrypt and upload your .env file. Creates a new project or updates an existing one.",
    usage: "keydrop push [options]",
    examples: ["keydrop push", "keydrop push --env .env.production", "keydrop push --name my-app"],
    options: [
      { flag: "--env <path>", description: "Path to .env file (default: .env)" },
      { flag: "--name <name>", description: "Project name for easier identification" },
      { flag: "--force", description: "Overwrite existing project without confirmation" },
    ],
  },
  {
    name: "run",
    id: "run",
    description: "Execute a command with secrets injected as environment variables. No code changes required.",
    usage: "keydrop run -- <command>",
    examples: ["keydrop run -- npm start", "keydrop run -- next dev", "keydrop run -- yarn build"],
    options: [
      { flag: "--key <key>", description: "Project key (uses cached key by default)" },
      { flag: "--env <path>", description: "Local .env to merge with remote secrets" },
    ],
  },
  {
    name: "pull",
    id: "pull",
    description: "Download and decrypt secrets to a local .env file.",
    usage: "keydrop pull [options]",
    examples: ["keydrop pull", "keydrop pull --output .env.local"],
    options: [
      { flag: "--key <key>", description: "Project key to pull from" },
      { flag: "--output <path>", description: "Output file path (default: .env)" },
      { flag: "--overwrite", description: "Overwrite existing file without confirmation" },
    ],
  },
  {
    name: "logout",
    id: "logout",
    description: "Sign out and clear your local session.",
    usage: "keydrop logout",
    examples: ["keydrop logout"],
    options: [],
  },
];

export default function CLIPage() {
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
          CLI Reference
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
          CLI Commands
        </h1>
        <p
          style={{
            fontSize: "17px",
            lineHeight: "1.7",
            color: "var(--text-secondary)",
            fontFamily: "var(--font-sans)",
          }}
        >
          Install the CLI for secret management and build-time injection. Use the SDK for runtime loading with init().
        </p>
      </div>

      <section id="installation" style={{ marginBottom: "48px", scrollMarginTop: "100px" }}>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "var(--text)",
            marginBottom: "16px",
            fontFamily: "var(--font-sans)",
          }}
        >
          Installation
        </h2>
        <div
          style={{
            padding: "14px 18px",
            borderRadius: "10px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            marginBottom: "12px",
          }}
        >
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--accent)" }}>
            npm install keydrop
          </code>
        </div>
        <div
          style={{
            padding: "14px 18px",
            borderRadius: "10px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--accent)" }}>
            npm install -g keydrop-cli
          </code>
        </div>
        <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "12px", fontFamily: "var(--font-sans)" }}>
          Works with npm, yarn, and pnpm.
        </p>
      </section>

      {commands.map((cmd) => (
        <section
          key={cmd.name}
          id={cmd.id}
          style={{ marginBottom: "48px", scrollMarginTop: "100px" }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "var(--text)",
              marginBottom: "8px",
              fontFamily: "var(--font-sans)",
            }}
          >
            <code
              style={{
                fontFamily: "var(--font-mono)",
                background: "var(--bg-secondary)",
                padding: "4px 10px",
                fontSize: "15px",
                borderRadius: "6px",
              }}
            >
              {cmd.name}
            </code>
          </h2>
          <p
            style={{
              fontSize: "15px",
              lineHeight: "1.6",
              color: "var(--text-secondary)",
              marginBottom: "20px",
              fontFamily: "var(--font-sans)",
            }}
          >
            {cmd.description}
          </p>

          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                fontWeight: "600",
                color: "var(--text-muted)",
                marginBottom: "8px",
                fontFamily: "var(--font-sans)",
              }}
            >
              Usage
            </p>
            <div
              style={{
                padding: "14px 18px",
                borderRadius: "10px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <code style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--text)" }}>
                {cmd.usage}
              </code>
            </div>
          </div>

          {cmd.examples.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "var(--text-muted)",
                  marginBottom: "8px",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Examples
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {cmd.examples.map((ex, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "8px",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "13px" }}>
                      $
                    </span>
                    <code
                      style={{
                        marginLeft: "8px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "14px",
                        color: "var(--accent)",
                      }}
                    >
                      {ex}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cmd.options.length > 0 && (
            <div>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "var(--text-muted)",
                  marginBottom: "8px",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Options
              </p>
              <div
                style={{
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  overflow: "hidden",
                }}
              >
                {cmd.options.map((opt, i) => (
                  <div
                    key={opt.flag}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "16px",
                      padding: "12px 16px",
                      background: i % 2 === 0 ? "var(--bg-card)" : "var(--bg)",
                      borderBottom: i < cmd.options.length - 1 ? "1px solid var(--border)" : "none",
                    }}
                  >
                    <code
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "13px",
                        color: "var(--accent)",
                        minWidth: "140px",
                      }}
                    >
                      {opt.flag}
                    </code>
                    <span
                      style={{
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {opt.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      ))}
    </>
  );
}
