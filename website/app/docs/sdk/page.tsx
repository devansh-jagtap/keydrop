"use client";

export default function SDKPage() {
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
          SDK Reference
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
          Node.js SDK
        </h1>
        <p
          style={{
            fontSize: "17px",
            lineHeight: "1.7",
            color: "var(--text-secondary)",
            fontFamily: "var(--font-sans)",
          }}
        >
          The SDK loads secrets at runtime into process.env. Pair it with keydrop run for build-time injection.
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
          }}
        >
          <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "13px" }}>$</span>
          <code style={{ marginLeft: "8px", fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--accent)" }}>
            npm install keydrop
          </code>
        </div>
      </section>

      <section id="usage" style={{ marginBottom: "48px", scrollMarginTop: "100px" }}>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "var(--text)",
            marginBottom: "16px",
            fontFamily: "var(--font-sans)",
          }}
        >
          Usage
        </h2>

        <div style={{ marginBottom: "24px" }}>
          <p
            style={{
              fontSize: "13px",
              fontWeight: "600",
              color: "var(--text-muted)",
              marginBottom: "12px",
              fontFamily: "var(--font-sans)",
            }}
          >
            ESM
          </p>
          <div
            style={{
              borderRadius: "12px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 16px",
                borderBottom: "1px solid var(--border)",
                background: "var(--bg-secondary)",
              }}
            >
              <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                app.js
              </span>
              <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                JavaScript
              </span>
            </div>
            <pre
              style={{
                margin: 0,
                padding: "16px 20px",
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                lineHeight: "1.7",
                overflowX: "auto",
              }}
            >
              <span style={{ color: "#c084fc" }}>import</span>
              <span style={{ color: "var(--text)" }}> {`{ init }`} </span>
              <span style={{ color: "#c084fc" }}>from</span>
              <span style={{ color: "var(--accent)" }}> {"\"keydrop\""}</span>
              <span style={{ color: "var(--text)" }}>;{"\n\n"}</span>
              <span style={{ color: "#c084fc" }}>await</span>
              <span style={{ color: "var(--text)" }}> init(){";\n\n"}</span>
              <span style={{ color: "#6b7280" }}>// process.env now contains your secrets</span>
            </pre>
          </div>
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
            CommonJS
          </p>
          <div
            style={{
              borderRadius: "12px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 16px",
                borderBottom: "1px solid var(--border)",
                background: "var(--bg-secondary)",
              }}
            >
              <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                app.js
              </span>
              <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                JavaScript
              </span>
            </div>
            <pre
              style={{
                margin: 0,
                padding: "16px 20px",
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                lineHeight: "1.7",
                overflowX: "auto",
              }}
            >
              <span style={{ color: "#c084fc" }}>const</span>
              <span style={{ color: "var(--text)" }}> {`{ init }`} </span>
              <span style={{ color: "#c084fc" }}>=</span>
              <span style={{ color: "var(--text)" }}> </span>
              <span style={{ color: "#c084fc" }}>require</span>
              <span style={{ color: "var(--text)" }}>{"(\"keydrop\")"};{"\n\n"}</span>
              <span style={{ color: "#c084fc" }}>await</span>
              <span style={{ color: "var(--text)" }}> init(){";\n\n"}</span>
              <span style={{ color: "#6b7280" }}>// process.env now contains your secrets</span>
            </pre>
          </div>
        </div>
      </section>

      <section id="init" style={{ marginBottom: "48px", scrollMarginTop: "100px" }}>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "var(--text)",
            marginBottom: "16px",
            fontFamily: "var(--font-sans)",
          }}
        >
          <code
            style={{
              fontFamily: "var(--font-mono)",
              background: "var(--bg-secondary)",
              padding: "4px 10px",
              fontSize: "15px",
              fontWeight: "600",
              color: "var(--accent)",
              borderRadius: "6px",
            }}
          >
            init
          </code>
          <code style={{ fontFamily: "var(--font-mono)", fontWeight: "400", color: "var(--text-muted)", fontSize: "16px" }}> (options?)</code>
        </h2>
        <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "20px", fontFamily: "var(--font-sans)" }}>
          Fetches and decrypts secrets from KeyDrop. Injects them into <code style={{ fontFamily: "var(--font-mono)", background: "var(--bg-secondary)", padding: "2px 6px", borderRadius: "4px", fontSize: "13px" }}>process.env</code>.
          Call this before your server starts.
        </p>

        <div style={{ marginBottom: "24px" }}>
          <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "12px", fontFamily: "var(--font-sans)" }}>
            Options
          </p>
          <div style={{ borderRadius: "10px", border: "1px solid var(--border)", overflow: "hidden" }}>
           <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    padding: "14px 16px",
    background: "var(--bg-card)",
    borderBottom: "1px solid var(--border)",
  }}
>
              <code style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--accent)", minWidth: "120px",
wordBreak: "break-word"}}>key</code>
             <span
  style={{
    fontSize: "14px",
    color: "var(--text-secondary)",
    fontFamily: "var(--font-sans)",
    flex: 1,
    minWidth: "200px",
  }}
>
                Project key (default: KEYDROP_KEY env var)
              </span>
            </div>
            <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    padding: "14px 16px",
    background: "var(--bg)",
  }}
>
              <code style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--accent)", minWidth: "120px",
wordBreak: "break-word"}}>override</code>
              <span
  style={{
    fontSize: "14px",
    color: "var(--text-secondary)",
    fontFamily: "var(--font-sans)",
    flex: 1,
    minWidth: "200px",
  }}
>
                Override existing env vars (default: false)
              </span>
            </div>
          </div>
        </div>

        <div>
          <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "12px", fontFamily: "var(--font-sans)" }}>
            Example
          </p>
          <div
            style={{
              borderRadius: "12px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}
          >
            <pre
              style={{
                margin: 0,
                padding: "16px 20px",
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                lineHeight: "1.7",
                overflowX: "auto",
              }}
            >
              <span style={{ color: "#c084fc" }}>await</span>
              <span style={{ color: "var(--text)" }}> init({`{`}</span>
              <span style={{ color: "var(--accent)" }}> key</span>
              <span style={{ color: "var(--text)" }}>: </span>
              <span style={{ color: "#84cc16" }}>{"\"proj_x82js8sh\""}</span>
              <span style={{ color: "var(--text)" }}> {`}`});</span>
            </pre>
          </div>
        </div>
      </section>

      <section id="when-to-use" style={{ scrollMarginTop: "100px" }}>
        <div
          style={{
            padding: "24px",
            borderRadius: "12px",
            background: "rgba(34, 211, 165, 0.06)",
            border: "1px solid rgba(34, 211, 165, 0.15)",
          }}
        >
          <h3 style={{ fontSize: "16px", fontWeight: "600", color: "var(--text)", marginBottom: "12px", fontFamily: "var(--font-sans)" }}>
            When to use the SDK
          </h3>
          <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
            Use init() in production so secrets load when your app starts. Use keydrop run for local development and CI/CD builds.
          </p>
        </div>
      </section>
    </>
  );
}
