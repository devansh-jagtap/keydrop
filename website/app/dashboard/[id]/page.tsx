"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { getSecrets, updateSecret } from "@/lib/api";

export default function ProjectPage() {
  const params = useParams();
  const projectKey = params.id as string;
  const { getToken } = useAuth();

  const [secrets, setSecrets] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<string | null>(null);

  // inline edit state: which key is being edited, its draft value, saving flag, error
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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
          setError(
            err instanceof Error ? err.message : "Failed to load secrets",
          );
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

  // Focus input when edit mode opens
  useEffect(() => {
    if (editingKey && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingKey]);

  function copyValue(key: string, value: string) {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  function startEdit(key: string) {
    setEditingKey(key);
    setEditDraft(secrets[key]);
    setSaveError("");
  }

  function cancelEdit() {
    setEditingKey(null);
    setEditDraft("");
    setSaveError("");
  }

  async function saveEdit(key: string) {
    if (!editDraft.trim()) {
      setSaveError("Value cannot be empty");
      return;
    }
    setSaving(true);
    setSaveError("");
    try {
      const token = await getToken();
      if (!token) throw new Error("Not authenticated");
      await updateSecret(projectKey, key, editDraft.trim(), token);
      setSecrets((prev) => ({ ...prev, [key]: editDraft.trim() }));
      setEditingKey(null);
      setEditDraft("");
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "var(--accent)",
              margin: "0 auto 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                border: "2px solid #080808",
                borderTopColor: "transparent",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
          </div>
          <p
            style={{
              color: "var(--text-secondary)",
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
            }}
          >
            Loading secrets...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "rgba(239,68,68,0.1)",
              margin: "0 auto 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <p
            style={{
              color: "#ef4444",
              fontFamily: "var(--font-sans)",
              marginBottom: "16px",
              fontWeight: "500",
            }}
          >
            {error}
          </p>
          <Link
            href="/dashboard"
            prefetch={false}
            style={{
              color: "var(--accent)",
              textDecoration: "none",
              fontFamily: "var(--font-sans)",
              fontWeight: "500",
            }}
          >
            Back to dashboard
          </Link>
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
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
            }}
          >
            <Image
              src="/svglogo.webp"
              alt="KeyDrop Logo"
              width={36}
              height={36}
              unoptimized
              style={{ borderRadius: "8px", filter: "var(--logo-filter)" }}
            />
            <span
              style={{
                fontSize: "16px",
                fontWeight: "700",
                color: "var(--text)",
                fontFamily: "var(--font-sans)",
              }}
            >
              KeyDrop
            </span>
          </Link>
          <Link
            href="/dashboard"
            prefetch={false}
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
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Projects
          </Link>
        </div>
      </header>

      <div
        style={{ maxWidth: "900px", margin: "0 auto", padding: "48px 24px" }}
      >
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: "700",
              letterSpacing: "-0.04em",
              lineHeight: "1.1",
              color: "var(--text)",
              fontFamily: "var(--font-sans)",
              marginBottom: "12px",
            }}
          >
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
              maxWidth: "100%",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              style={{ flexShrink: 0 }}
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <code
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
                color: "var(--accent)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
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
            <p
              style={{
                fontSize: "11px",
                fontWeight: "600",
                color: "var(--text-muted)",
                marginBottom: "6px",
                fontFamily: "var(--font-sans)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Total Secrets
            </p>
            <p
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "var(--text)",
                fontFamily: "var(--font-sans)",
              }}
            >
              {Object.keys(secrets).length}
            </p>
          </div>
          <div
            style={{
              padding: "20px",
              borderRadius: "14px",
              background:
                "linear-gradient(135deg, rgba(34,211,165,0.1) 0%, rgba(34,211,165,0.05) 100%)",
              border: "1px solid rgba(34,211,165,0.2)",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                fontWeight: "600",
                color: "var(--accent)",
                marginBottom: "6px",
                fontFamily: "var(--font-sans)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Encrypted
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span
                style={{
                  fontSize: "14px",
                  color: "var(--accent)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: "500",
                }}
              >
                AES-256
              </span>
            </div>
          </div>
        </div>

        {/* Secrets list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {Object.entries(secrets).map(([key, value]) => {
            const isEditing = editingKey === key;
            return (
              <div
                key={key}
                style={{
                  background: "var(--bg-card)",
                  border: `1px solid ${isEditing ? "var(--accent)" : "var(--border)"}`,
                  borderRadius: "14px",
                  padding: "20px 24px",
                  transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!isEditing) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
                    e.currentTarget.style.borderColor = "var(--border-strong)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isEditing) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "var(--border)";
                  }
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "20px",
                  }}
                >
                  {/* Left: key name + value / edit input */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "var(--accent)",
                        fontFamily: "var(--font-mono)",
                        marginBottom: "8px",
                      }}
                    >
                      {key}
                    </p>

                    {isEditing ? (
                      /* ── Inline edit area ── */
                      <div>
                        <input
                          ref={inputRef}
                          value={editDraft}
                          onChange={(e) => {
                            setEditDraft(e.target.value);
                            setSaveError("");
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit(key);
                            if (e.key === "Escape") cancelEdit();
                          }}
                          disabled={saving}
                          style={{
                            width: "100%",
                            padding: "12px 16px",
                            borderRadius: "8px",
                            background: "var(--bg)",
                            border: `1px solid ${saveError ? "#ef4444" : "var(--accent)"}`,
                            color: "var(--text)",
                            fontSize: "14px",
                            fontFamily: "var(--font-mono)",
                            outline: "none",
                            boxSizing: "border-box",
                            opacity: saving ? 0.6 : 1,
                            transition: "border-color 0.15s",
                          }}
                        />
                        {saveError && (
                          <p
                            style={{
                              marginTop: "6px",
                              fontSize: "12px",
                              color: "#ef4444",
                              fontFamily: "var(--font-sans)",
                            }}
                          >
                            {saveError}
                          </p>
                        )}
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            marginTop: "10px",
                          }}
                        >
                          <button
                            onClick={() => saveEdit(key)}
                            disabled={saving}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "8px 16px",
                              borderRadius: "9999px",
                              border: "none",
                              background: "var(--accent)",
                              color: "#080808",
                              fontSize: "13px",
                              fontWeight: "600",
                              cursor: saving ? "not-allowed" : "pointer",
                              fontFamily: "var(--font-sans)",
                              opacity: saving ? 0.7 : 1,
                              transition: "opacity 0.15s",
                            }}
                          >
                            {saving ? (
                              <>
                                <div
                                  style={{
                                    width: "12px",
                                    height: "12px",
                                    border: "2px solid #080808",
                                    borderTopColor: "transparent",
                                    borderRadius: "50%",
                                    animation: "spin 0.7s linear infinite",
                                  }}
                                />
                                Saving…
                              </>
                            ) : (
                              <>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Save
                              </>
                            )}
                          </button>
                          <button
                            onClick={cancelEdit}
                            disabled={saving}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "8px 16px",
                              borderRadius: "9999px",
                              border: "1px solid var(--border-strong)",
                              background: "transparent",
                              color: "var(--text-secondary)",
                              fontSize: "13px",
                              fontWeight: "500",
                              cursor: saving ? "not-allowed" : "pointer",
                              fontFamily: "var(--font-sans)",
                              opacity: saving ? 0.5 : 1,
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* ── Normal value display ── */
                      <div
                        style={{
                          padding: "12px 16px",
                          borderRadius: "8px",
                          background: "var(--bg)",
                          border: "1px solid var(--border)",
                          overflowX: "auto",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "14px",
                            color: "var(--text-secondary)",
                            fontFamily: "var(--font-mono)",
                            whiteSpace: "nowrap",
                            margin: 0,
                          }}
                        >
                          {revealed[key]
                            ? value
                            : "••••••••••••••••••••••••••••••••••••••••••••••••••••"}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right: action buttons (hidden while editing) */}
                  {!isEditing && (
                    <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                      {/* Reveal / Hide */}
                      <button
                        onClick={() =>
                          setRevealed((prev) => ({ ...prev, [key]: !prev[key] }))
                        }
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
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--text)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "var(--text-secondary)")
                        }
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

                      {/* Edit */}
                      <button
                        onClick={() => startEdit(key)}
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
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--text)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "var(--text-secondary)")
                        }
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Edit
                      </button>

                      {/* Copy */}
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
                          color:
                            copied === key
                              ? "var(--accent)"
                              : "var(--text-secondary)",
                          fontSize: "13px",
                          fontWeight: "500",
                          cursor: "pointer",
                          fontFamily: "var(--font-sans)",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          if (copied !== key)
                            e.currentTarget.style.color = "var(--text)";
                        }}
                        onMouseLeave={(e) => {
                          if (copied !== key)
                            e.currentTarget.style.color = "var(--text-secondary)";
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
                  )}
                </div>
              </div>
            );
          })}
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
          <p
            style={{
              fontSize: "14px",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-sans)",
            }}
          >
            {Object.keys(secrets).length} secret
            {Object.keys(secrets).length !== 1 ? "s" : ""} stored securely
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
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Learn about security
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: var(--text-muted); }
      `}</style>
    </main>
  );
}
