"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getSecrets } from "@/lib/api";

export default function ProjectPage() {
  const params = useParams();
  const projectKey = params.id as string;

  const [secrets, setSecrets] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchSecrets() {
      try {
        const data = await getSecrets(projectKey);
        if (active) {
          setSecrets(data.secrets || {});
        }
      } catch (err: unknown) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load secrets");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchSecrets();

    return () => {
      active = false;
    };
  }, [projectKey]);

  function copyValue(key: string, value: string) {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  if (loading) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--accent)", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "20px", height: "20px", border: "2px solid #080808", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
          </div>
          <p style={{ color: "var(--text-secondary)", fontFamily: "var(--font-sans)", fontSize: "14px" }}>Loading secrets...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: "rgba(239,68,68,0.1)", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <p style={{ color: "#ef4444", fontFamily: "var(--font-sans)", marginBottom: "16px", fontWeight: "500" }}>{error}</p>
          <Link href="/dashboard" style={{ color: "var(--accent)", textDecoration: "none", fontFamily: "var(--font-sans)", fontWeight: "500" }}>Back to dashboard</Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Top bar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "var(--bg)",
          borderBottom: "1px solid var(--border)",
          padding: "16px 24px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <Image
              src="/svglogo.webp"
              alt="KeyDrop Logo"
              width={36}
              height={36}
              unoptimized
              style={{ borderRadius: "8px", filter: "var(--logo-filter)" }}
            />
            <span style={{ fontSize: "16px", fontWeight: "700", color: "var(--text)", fontFamily: "var(--font-sans)" }}>
              KeyDrop
            </span>
          </Link>
          <Link
            href="/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              borderRadius: "9999px",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              fontSize: "13px",
              fontWeight: "500",
              textDecoration: "none",
              fontFamily: "var(--font-sans)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text)";
              e.currentTarget.style.borderColor = "var(--border-strong)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Projects
          </Link>
        </div>
      </header>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "48px 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: "700", letterSpacing: "-0.04em", lineHeight: "1.1", color: "var(--text)", fontFamily: "var(--font-sans)", marginBottom: "12px" }}>
            Project Secrets
          </h1>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 16px",
              borderRadius: "10px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <code style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--accent)" }}>
              {projectKey}
            </code>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              padding: "20px",
              borderRadius: "14px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <p style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "6px", fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Total Secrets
            </p>
            <p style={{ fontSize: "28px", fontWeight: "700", color: "var(--text)", fontFamily: "var(--font-sans)" }}>
              {Object.keys(secrets).length}
            </p>
          </div>
          <div
            style={{
              padding: "20px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, rgba(34,211,165,0.1) 0%, rgba(34,211,165,0.05) 100%)",
              border: "1px solid rgba(34,211,165,0.2)",
            }}
          >
            <p style={{ fontSize: "11px", fontWeight: "600", color: "var(--accent)", marginBottom: "6px", fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Encrypted
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span style={{ fontSize: "14px", color: "var(--accent)", fontFamily: "var(--font-sans)", fontWeight: "500" }}>
                AES-256
              </span>
            </div>
          </div>
        </div>

        {/* Secrets list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {Object.entries(secrets).map(([key, value]) => (
            <div
              key={key}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "20px 24px",
                transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
                e.currentTarget.style.borderColor = "var(--border-strong)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "20px" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--accent)", fontFamily: "var(--font-mono)", marginBottom: "8px" }}>
                    {key}
                  </p>
                  <div
                    style={{
                      padding: "12px 16px",
                      borderRadius: "8px",
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: revealed[key] ? "pre-wrap" : "nowrap", margin: 0 }}>
                      {revealed[key] ? value : "••••••••••••••••••••••••••••••••••••••••••••••••••••"}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  <button
                    onClick={() => setRevealed((prev) => ({ ...prev, [key]: !prev[key] }))}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "10px 14px",
                      borderRadius: "9999px",
                      border: "1px solid var(--border-strong)",
                      background: "transparent",
                      color: "var(--text-secondary)",
                      fontSize: "13px",
                      fontWeight: "500",
                      cursor: "pointer",
                      fontFamily: "var(--font-sans)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  >
                    {revealed[key] ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                        Hide
                      </>
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        Show
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => copyValue(key, value)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "10px 14px",
                      borderRadius: "9999px",
                      border: "1px solid var(--border-strong)",
                      background: "transparent",
                      color: copied === key ? "var(--accent)" : "var(--text-secondary)",
                      fontSize: "13px",
                      fontWeight: "500",
                      cursor: "pointer",
                      fontFamily: "var(--font-sans)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (copied !== key) e.currentTarget.style.color = "var(--text)";
                    }}
                    onMouseLeave={(e) => {
                      if (copied !== key) e.currentTarget.style.color = "var(--text-secondary)";
                    }}
                  >
                    {copied === key ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Copied
                      </>
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "40px",
            padding: "20px 24px",
            borderRadius: "14px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
            {Object.keys(secrets).length} secret{Object.keys(secrets).length !== 1 ? "s" : ""} stored securely
          </p>
          <Link
            href="/docs/security"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--accent)",
              fontSize: "13px",
              fontWeight: "500",
              textDecoration: "none",
              fontFamily: "var(--font-sans)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Learn about security
          </Link>
        </div>
      </div>
    </main>
  );
}
