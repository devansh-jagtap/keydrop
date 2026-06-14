"use client";

export default function HowItWorksPage() {
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
          Understanding
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
          How it Works
        </h1>
        <p
          style={{
            fontSize: "17px",
            lineHeight: "1.7",
            color: "var(--text-secondary)",
            fontFamily: "var(--font-sans)",
          }}
        >
          KeyDrop encrypts your secrets locally and gives you a single key to rule them all.
        </p>
      </div>

      <section id="architecture" style={{ marginBottom: "48px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          The Architecture
        </h2>
        <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "20px", fontFamily: "var(--font-sans)" }}>
          KeyDrop follows a zero-knowledge architecture. Your secrets are encrypted on your machine before they ever touch our servers. 
          We never see your plaintext values.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {[
            { step: "1", title: "Local Encryption", desc: "Your .env is encrypted locally using AES-256 before uploading." },
            { step: "2", title: "Secure Storage", desc: "Encrypted data is stored with your project key as the identifier." },
            { step: "3", title: "Key-based Retrieval", desc: "Use your project key to decrypt secrets at runtime." },
            { step: "4", title: "Environment Injection", desc: "Secrets are injected as environment variables into your process." },
          ].map((item) => (
            <div
              key={item.step}
              style={{
                display: "flex",
                gap: "16px",
                padding: "20px",
                borderRadius: "12px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "var(--accent)",
                  color: "#080808",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "700",
                  fontFamily: "var(--font-sans)",
                  flexShrink: 0,
                }}
              >
                {item.step}
              </div>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: "600", color: "var(--text)", marginBottom: "6px", fontFamily: "var(--font-sans)" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "14px", lineHeight: "1.5", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="encryption" style={{ marginBottom: "48px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          Encryption Details
        </h2>
        <div
          style={{
            padding: "20px 24px",
            borderRadius: "12px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "grid", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>Algorithm</span>
              <span style={{ fontSize: "14px", color: "var(--text)", fontFamily: "var(--font-mono)" }}>AES-256-GCM</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>Key Derivation</span>
              <span style={{ fontSize: "14px", color: "var(--text)", fontFamily: "var(--font-mono)" }}>PBKDF2</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>Key Length</span>
              <span style={{ fontSize: "14px", color: "var(--text)", fontFamily: "var(--font-mono)" }}>256 bits</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0" }}>
              <span style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>Transport</span>
              <span style={{ fontSize: "14px", color: "var(--text)", fontFamily: "var(--font-mono)" }}>TLS 1.3</span>
            </div>
          </div>
        </div>
      </section>

      <section id="security-model" style={{ marginBottom: "48px", scrollMarginTop: "100px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
          Security Model
        </h2>
        <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "20px", fontFamily: "var(--font-sans)" }}>
          KeyDrop is designed with a zero-knowledge architecture. Here is what that means:
        </p>
        <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", padding: 0, margin: 0 }}>
          {[
            "Your secrets are encrypted before they leave your machine",
            "We store only encrypted data - never plaintext",
            "Your project key is used only for decryption on your infrastructure",
            "We cannot access your secrets even if we wanted to",
          ].map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" style={{ flexShrink: 0, marginTop: "2px" }}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ fontSize: "15px", lineHeight: "1.5", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
