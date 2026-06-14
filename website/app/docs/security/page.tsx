"use client";

export default function SecurityPage() {
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
          Resources
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
          Security
        </h1>
        <p
          style={{
            fontSize: "17px",
            lineHeight: "1.7",
            color: "var(--text-secondary)",
            fontFamily: "var(--font-sans)",
          }}
        >
          KeyDrop is built with security as the foundation. Here is how we protect your secrets.
        </p>
      </div>

      <section id="zero-knowledge" style={{ marginBottom: "48px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          Zero-Knowledge Architecture
        </h2>
        <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          KeyDrop uses a zero-knowledge architecture. Your secrets are encrypted on your device before they ever reach our servers. 
          We never have access to your plaintext secrets.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            { title: "Client-side encryption", desc: "All encryption happens locally using AES-256-GCM before data is uploaded." },
            { title: "Separate decryption keys", desc: "Your project key is never stored on our servers. Only you have it." },
            { title: "End-to-end encryption", desc: "Data is encrypted in transit (TLS 1.3) and at rest." },
            { title: "No plaintext access", desc: "We cannot read your secrets even if compelled by legal process." },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                display: "flex",
                gap: "16px",
                padding: "20px",
                borderRadius: "10px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" style={{ flexShrink: 0, marginTop: "2px" }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: "600", color: "var(--text)", marginBottom: "4px", fontFamily: "var(--font-sans)" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="compliance" style={{ marginBottom: "48px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          Best Practices
        </h2>
        <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          Follow these recommendations to maximize security:
        </p>
        <ul style={{ display: "flex", flexDirection: "column", gap: "8px", listStyle: "none", padding: 0, margin: 0 }}>
          {[
            "Never commit your project key to version control",
            "Use different projects for different environments (dev, staging, prod)",
            "Rotate secrets regularly using keydrop push",
            "Limit team access based on principle of least privilege",
            "Use strong passwords for your KeyDrop account",
          ].map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <span style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "14px" }}>-</span>
              <span style={{ fontSize: "15px", lineHeight: "1.5", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section id="questions" style={{ scrollMarginTop: "100px" }}>
        <div style={{ padding: "20px 24px", borderRadius: "12px", background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "600", color: "var(--text)", marginBottom: "8px", fontFamily: "var(--font-sans)" }}>
            Security Questions?
          </h3>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
            If you have questions about our security practices or discover a vulnerability, please email 
            <a href="mailto:security@keydrop.dev" style={{ color: "var(--accent)", marginLeft: "4px" }}>security@keydrop.dev</a>
          </p>
        </div>
      </section>
    </>
  );
}
