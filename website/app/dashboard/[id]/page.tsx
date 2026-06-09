"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
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
        <p style={{ color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>Loading secrets...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#ef4444", fontFamily: "var(--font-sans)", marginBottom: "16px" }}>{error}</p>
          <Link href="/dashboard" style={{ color: "var(--accent)", textDecoration: "none", fontFamily: "var(--font-sans)" }}>← Back to dashboard</Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", padding: "80px 24px 48px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        {/* back */}
        <Link href="/dashboard"
          style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--text-secondary)", textDecoration: "none", fontSize: "13px", fontFamily: "var(--font-sans)", marginBottom: "32px", transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
        >
          ← Back to projects
        </Link>

        {/* header */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text)", fontFamily: "var(--font-sans)", letterSpacing: "-0.03em", marginBottom: "8px" }}>
            Project Secrets
          </h1>
          <code style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", background: "var(--bg-secondary)", padding: "4px 10px", borderRadius: "6px" }}>
            {projectKey}
          </code>
        </div>

        {/* secrets list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {Object.entries(secrets).map(([key, value]) => (
            <div key={key}
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "16px", transition: "border-color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-strong)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)")}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "12px", fontWeight: "600", color: "var(--accent)", fontFamily: "var(--font-mono)", marginBottom: "4px" }}>{key}</p>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {revealed[key] ? value : "•".repeat(Math.min(value.length, 24))}
                </p>
              </div>

              <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                <button onClick={() => setRevealed((prev) => ({ ...prev, [key]: !prev[key] }))}
                  style={{ padding: "6px 12px", borderRadius: "9999px", border: "1px solid var(--border-strong)", background: "transparent", color: "var(--text-secondary)", fontSize: "11px", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
                  {revealed[key] ? "Hide" : "Show"}
                </button>
                <button onClick={() => copyValue(key, value)}
                  style={{ padding: "6px 12px", borderRadius: "9999px", border: "1px solid var(--border-strong)", background: "transparent", color: copied === key ? "var(--accent)" : "var(--text-secondary)", fontSize: "11px", cursor: "pointer", fontFamily: "var(--font-sans)", transition: "color 0.2s" }}>
                  {copied === key ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* secret count */}
        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
          {Object.keys(secrets).length} secret{Object.keys(secrets).length !== 1 ? "s" : ""} stored
        </p>
      </div>
    </main>
  );
}
