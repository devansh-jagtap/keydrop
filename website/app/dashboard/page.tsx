"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import { deleteProject, getProjects } from "@/lib/api";

interface Project {
  id: string;
  projectKey: string;
  name: string;
  createdAt: string;
}

export default function Dashboard() {
  const router = useRouter();
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [apiToken, setApiToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !isUserLoaded) return;

    if (!isSignedIn) {
      router.replace("/");
      return;
    }

    let active = true;

    async function fetchProjects() {
      try {
        setError("");
        const clerkToken = await getToken();
        if (!clerkToken) throw new Error("No Clerk token");
        
        const data = await getProjects(clerkToken);

        if (active) {
          setApiToken(clerkToken);
          setProjects(data.projects || []);
        }
      } catch (err: unknown) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load projects");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchProjects();

    return () => {
      active = false;
    };
  }, [getToken, isLoaded, isSignedIn, isUserLoaded, router, user]);

  async function handleDelete(projectKey: string) {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    try {
      let token = apiToken;
      if (!token) {
        token = await getToken();
        if (!token) throw new Error("No Clerk token");
        setApiToken(token);
      }

      await deleteProject(projectKey, token);
      setProjects((prev) => prev.filter((p) => p.projectKey !== projectKey));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  }

  function copyKey(key: string) {
    navigator.clipboard.writeText(key);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  if (!isLoaded || (isSignedIn && loading)) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--accent)", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "20px", height: "20px", border: "2px solid #080808", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
          </div>
          <p style={{ color: "var(--text-secondary)", fontFamily: "var(--font-sans)", fontSize: "14px" }}>Loading your projects...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </main>
    );
  }

  if (!isSignedIn) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
        <p style={{ color: "var(--text-secondary)", fontFamily: "var(--font-sans)", fontSize: "14px" }}>Redirecting to sign in...</p>
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
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link
              href="/docs"
              style={{ fontSize: "14px", color: "var(--text-secondary)", textDecoration: "none", fontFamily: "var(--font-sans)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              Docs
            </Link>
            <UserButton />
          </div>
        </div>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "700",
              letterSpacing: "-0.04em",
              lineHeight: "1.1",
              color: "var(--text)",
              marginBottom: "12px",
              fontFamily: "var(--font-sans)",
            }}
          >
            Dashboard
          </h1>
          <p style={{ fontSize: "17px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
            Manage your secrets and project keys
          </p>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              padding: "24px",
              borderRadius: "16px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <p style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "8px", fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Total Projects
            </p>
            <p style={{ fontSize: "32px", fontWeight: "700", color: "var(--text)", fontFamily: "var(--font-sans)" }}>
              {projects.length}
            </p>
          </div>
          <div
            style={{
              padding: "24px",
              borderRadius: "16px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <p style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "8px", fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Active Secrets
            </p>
            <p style={{ fontSize: "32px", fontWeight: "700", color: "var(--text)", fontFamily: "var(--font-sans)" }}>
              {projects.length > 0 ? projects.length : 0}
            </p>
          </div>
          <div
            style={{
              padding: "24px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, rgba(34,211,165,0.1) 0%, rgba(34,211,165,0.05) 100%)",
              border: "1px solid rgba(34,211,165,0.2)",
            }}
          >
            <p style={{ fontSize: "12px", fontWeight: "600", color: "var(--accent)", marginBottom: "8px", fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Quick Start
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <code style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--accent)" }}>keydrop push</code>
            </div>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div
            style={{
              padding: "48px",
              borderRadius: "20px",
              border: "1px solid rgba(239,68,68,0.25)",
              background: "rgba(239,68,68,0.04)",
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
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
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", marginBottom: "8px", fontFamily: "var(--font-sans)" }}>
              Failed to load projects
            </h2>
            <p style={{ fontSize: "14px", color: "#ef4444", fontFamily: "var(--font-sans)" }}>{error}</p>
          </div>
        )}

        {/* Empty state */}
        {projects.length === 0 && !error && (
          <div
            style={{
              padding: "80px 48px",
              borderRadius: "24px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "20px",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                margin: "0 auto 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text)", marginBottom: "12px", fontFamily: "var(--font-sans)" }}>
              No projects yet
            </h2>
            <p style={{ fontSize: "15px", color: "var(--text-secondary)", maxWidth: "400px", margin: "0 auto 32px", fontFamily: "var(--font-sans)", lineHeight: "1.6" }}>
              Create your first project by running the command below from your terminal. Your secrets will be encrypted and stored securely.
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 24px",
                borderRadius: "12px",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                marginBottom: "32px",
              }}
            >
              <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "14px" }}>$</span>
              <code style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "15px" }}>
                keydrop push
              </code>
            </div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <Link
                href="/docs/getting-started"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  borderRadius: "9999px",
                  background: "var(--accent)",
                  color: "#080808",
                  fontSize: "14px",
                  fontWeight: "600",
                  textDecoration: "none",
                  fontFamily: "var(--font-sans)",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Get Started
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
              <Link
                href="/docs/cli"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  borderRadius: "9999px",
                  border: "1px solid var(--border-strong)",
                  color: "var(--text-secondary)",
                  fontSize: "14px",
                  fontWeight: "500",
                  textDecoration: "none",
                  fontFamily: "var(--font-sans)",
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text)";
                  e.currentTarget.style.borderColor = "var(--text-muted)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.borderColor = "var(--border-strong)";
                }}
              >
                CLI Reference
              </Link>
            </div>
          </div>
        )}

        {/* Projects grid */}
        {projects.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
              gap: "20px",
            }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)";
                  e.currentTarget.style.borderColor = "var(--border-strong)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                <div style={{ padding: "24px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
                    <div>
                      <h3 style={{ fontSize: "18px", fontWeight: "600", color: "var(--text)", fontFamily: "var(--font-sans)", marginBottom: "4px" }}>
                        {project.name || "Untitled Project"}
                      </h3>
                      <p style={{ fontSize: "13px", color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}>
                        Created {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(project.projectKey)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        border: "1px solid var(--border)",
                        background: "transparent",
                        color: "var(--text-muted)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#ef4444";
                        e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
                        e.currentTarget.style.background = "rgba(239,68,68,0.06)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--text-muted)";
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.background = "transparent";
                      }}
                      title="Delete project"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>

                  <div
                    style={{
                      padding: "16px",
                      borderRadius: "12px",
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      marginBottom: "20px",
                    }}
                  >
                    <p style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "8px", fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Project Key
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <code style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--accent)" }}>
                        {project.projectKey}
                      </code>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => copyKey(project.projectKey)}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        padding: "12px 16px",
                        borderRadius: "10px",
                        border: "1px solid var(--border-strong)",
                        background: "transparent",
                        color: copied === project.projectKey ? "var(--accent)" : "var(--text-secondary)",
                        fontSize: "14px",
                        fontWeight: "500",
                        cursor: "pointer",
                        fontFamily: "var(--font-sans)",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                      onMouseLeave={(e) => {
                        if (copied !== project.projectKey) e.currentTarget.style.color = "var(--text-secondary)";
                      }}
                    >
                      {copied === project.projectKey ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                          Copy Key
                        </>
                      )}
                    </button>
                    <Link
                      href={`/dashboard/${project.projectKey}`}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        padding: "12px 16px",
                        borderRadius: "10px",
                        background: "var(--accent)",
                        color: "#080808",
                        fontSize: "14px",
                        fontWeight: "600",
                        textDecoration: "none",
                        fontFamily: "var(--font-sans)",
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      View Secrets
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help footer */}
        <div
          style={{
            marginTop: "48px",
            padding: "24px",
            borderRadius: "16px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <h3 style={{ fontSize: "15px", fontWeight: "600", color: "var(--text)", marginBottom: "4px", fontFamily: "var(--font-sans)" }}>
              Need help?
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
              Check out the documentation or reach out on GitHub.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <Link
              href="/docs"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 18px",
                borderRadius: "9999px",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                fontSize: "14px",
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
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              Documentation
            </Link>
            <a
              href="https://github.com/devansh-jagtap/keydrop"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 18px",
                borderRadius: "9999px",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                fontSize: "14px",
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
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
