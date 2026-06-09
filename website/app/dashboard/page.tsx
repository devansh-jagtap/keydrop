"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { UserButton, useAuth, useClerk, useUser } from "@clerk/nextjs";
import { createKeydropTokenFromClerk, deleteProject, getProjects } from "@/lib/api";

interface Project {
  id: string;
  projectKey: string;
  name: string;
  createdAt: string;
}

export default function Dashboard() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const { user, isLoaded: isUserLoaded } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [apiToken, setApiToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !isUserLoaded) {
      return;
    }

    if (!isSignedIn) {
      return;
    }

    let active = true;

    async function fetchProjects() {
      try {
        setError("");
        const clerkToken = await getToken();
        const session = await createKeydropTokenFromClerk(clerkToken, {
          email: user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || null,
          name: user?.fullName || user?.username || null,
          avatarUrl: user?.imageUrl || null,
        });
        const data = await getProjects(session.token);

        if (active) {
          setApiToken(session.token);
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
  }, [getToken, isLoaded, isSignedIn, isUserLoaded, user]);

  async function handleDelete(projectKey: string) {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    try {
      let token = apiToken;
      if (!token) {
        const clerkToken = await getToken();
        const session = await createKeydropTokenFromClerk(clerkToken, {
          email: user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || null,
          name: user?.fullName || user?.username || null,
          avatarUrl: user?.imageUrl || null,
        });
        token = session.token;
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
        <p style={{ color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>Loading projects...</p>
      </main>
    );
  }

  if (!isSignedIn) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
        <p style={{ color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>Redirecting to sign in...</p>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", padding: "80px 24px 48px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        {/* header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "var(--accent)", color: "#080808", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "700" }}>K</div>
              <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>KeyDrop</span>
            </div>
            <h1 style={{ fontSize: "28px", fontWeight: "700", color: "var(--text)", fontFamily: "var(--font-sans)", letterSpacing: "-0.03em" }}>Your Projects</h1>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginTop: "4px", fontFamily: "var(--font-sans)" }}>
              {projects.length} project{projects.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link
              href="/"
              style={{ padding: "8px 16px", borderRadius: "9999px", border: "1px solid var(--border-strong)", background: "transparent", color: "var(--text-secondary)", fontSize: "13px", textDecoration: "none", fontFamily: "var(--font-sans)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              Back to home
            </Link>
            <UserButton />
            <button onClick={() => signOut({ redirectUrl: "/" })}
              style={{ padding: "8px 16px", borderRadius: "9999px", border: "1px solid var(--border-strong)", background: "transparent", color: "var(--text-secondary)", fontSize: "13px", cursor: "pointer", fontFamily: "var(--font-sans)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              Logout
            </button>
          </div>
        </div>

        {/* empty state */}
        {error ? (
          <div style={{ textAlign: "center", padding: "80px 24px", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "12px", background: "rgba(239,68,68,0.05)" }}>
            <p style={{ fontSize: "18px", fontWeight: "600", color: "var(--text)", marginBottom: "8px", fontFamily: "var(--font-sans)" }}>Projects could not be loaded</p>
            <p style={{ fontSize: "14px", color: "#ef4444", fontFamily: "var(--font-sans)" }}>{error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 24px", borderRadius: "20px", border: "1px dashed var(--border-strong)", background: "var(--bg-card)" }}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>🔐</div>
            <p style={{ fontSize: "18px", fontWeight: "600", color: "var(--text)", marginBottom: "8px", fontFamily: "var(--font-sans)" }}>No projects yet</p>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "24px", fontFamily: "var(--font-sans)" }}>Run <code style={{ fontFamily: "var(--font-mono)", background: "var(--bg-secondary)", padding: "2px 8px", borderRadius: "6px", fontSize: "13px" }}>keydrop push</code> to create your first project</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {projects.map((project) => (
              <div key={project.id}
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", transition: "border-color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-strong)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)")}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "15px", fontWeight: "600", color: "var(--text)", marginBottom: "6px", fontFamily: "var(--font-sans)" }}>
                    {project.name || "Untitled Project"}
                  </p>
                  <code style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", background: "var(--bg-secondary)", padding: "3px 8px", borderRadius: "6px", display: "inline-block", maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {project.projectKey}
                  </code>
                  <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "6px", fontFamily: "var(--font-sans)" }}>
                    Created {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  <button onClick={() => copyKey(project.projectKey)}
                    style={{ padding: "7px 14px", borderRadius: "9999px", border: "1px solid var(--border-strong)", background: "transparent", color: copied === project.projectKey ? "var(--accent)" : "var(--text-secondary)", fontSize: "12px", cursor: "pointer", fontFamily: "var(--font-sans)", transition: "all 0.2s" }}>
                    {copied === project.projectKey ? "Copied!" : "Copy key"}
                  </button>
                  <Link href={`/dashboard/${project.projectKey}`}
                    style={{ padding: "7px 14px", borderRadius: "9999px", border: "1px solid var(--border-strong)", background: "transparent", color: "var(--text-secondary)", fontSize: "12px", textDecoration: "none", fontFamily: "var(--font-sans)", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  >
                    View secrets
                  </Link>
                  <button onClick={() => handleDelete(project.projectKey)}
                    style={{ padding: "7px 14px", borderRadius: "9999px", border: "1px solid rgba(239,68,68,0.2)", background: "transparent", color: "rgba(239,68,68,0.6)", fontSize: "12px", cursor: "pointer", fontFamily: "var(--font-sans)", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(239,68,68,0.6)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.2)"; }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
