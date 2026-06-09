"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { login, register, confirmCliToken, getToken, getGoogleAuthUrl } from "@/lib/api";
import { Suspense } from "react";

function CliAuthContent() {
  const searchParams = useSearchParams();
  const cliToken = searchParams.get("token");

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // if already logged in, confirm immediately
    const existingToken = getToken();
    if (existingToken && cliToken) {
      confirmCliToken(cliToken, existingToken)
        .then(() => setDone(true))
        .catch(() => {});
    }
  }, [cliToken]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password);
      }

      const jwt = getToken()!;

      if (cliToken) {
        await confirmCliToken(cliToken, jwt);
      }

      setDone(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleLogin() {
    const url = getGoogleAuthUrl({ cliToken: cliToken || undefined });

    if (!url) {
      setError("Google sign-in is not configured");
      return;
    }

    window.location.href = url;
  }

  if (!cliToken) {
    return (
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>Invalid or missing CLI token.</p>
        <Link href="/" style={{ color: "var(--accent)", textDecoration: "none", marginTop: "16px", display: "inline-block" }}>Go home</Link>
      </div>
    );
  }

  if (done) {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
        <p style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Logged in!</p>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>You can close this tab and return to your terminal.</p>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", maxWidth: "400px" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "var(--accent)", color: "#080808", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", margin: "0 auto 16px" }}>K</div>
        <p style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", fontFamily: "var(--font-sans)", marginBottom: "4px" }}>Authorize CLI</p>
        <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>Sign in to authorize the KeyDrop CLI</p>
      </div>

      {/* mode toggle */}
      <div style={{ display: "flex", background: "var(--bg-secondary)", borderRadius: "10px", padding: "4px", marginBottom: "24px", border: "1px solid var(--border)" }}>
        {(["login", "register"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "500", fontFamily: "var(--font-sans)", transition: "all 0.2s", background: mode === m ? "var(--bg-card)" : "transparent", color: mode === m ? "var(--text)" : "var(--text-secondary)", boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.1)" : "none" }}>
            {m === "login" ? "Sign in" : "Sign up"}
          </button>
        ))}
      </div>

      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-strong)", borderRadius: "16px", padding: "28px" }}>
        <button type="button" onClick={handleGoogleLogin}
          style={{ width: "100%", padding: "11px", borderRadius: "10px", background: "var(--bg-secondary)", color: "var(--text)", fontSize: "14px", fontWeight: "600", border: "1px solid var(--border-strong)", cursor: "pointer", fontFamily: "var(--font-sans)", marginBottom: "14px" }}>
          Continue with Google
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
          <div style={{ height: "1px", flex: 1, background: "var(--border)" }} />
          <span style={{ color: "var(--text-secondary)", fontSize: "12px", fontFamily: "var(--font-sans)" }}>or</span>
          <div style={{ height: "1px", flex: 1, background: "var(--border)" }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {error && (
            <div style={{ padding: "10px 14px", borderRadius: "8px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", fontSize: "13px", color: "#ef4444", fontFamily: "var(--font-sans)" }}>
              {error}
            </div>
          )}

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "500", color: "var(--text-secondary)", marginBottom: "6px", fontFamily: "var(--font-sans)" }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com"
              style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid var(--border-strong)", background: "var(--bg-secondary)", color: "var(--text)", fontSize: "14px", fontFamily: "var(--font-sans)", outline: "none" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-strong)")}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "500", color: "var(--text-secondary)", marginBottom: "6px", fontFamily: "var(--font-sans)" }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••"
              style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid var(--border-strong)", background: "var(--bg-secondary)", color: "var(--text)", fontSize: "14px", fontFamily: "var(--font-sans)", outline: "none" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-strong)")}
            />
          </div>

          <button type="submit" disabled={loading}
            style={{ width: "100%", padding: "11px", borderRadius: "10px", background: "var(--accent)", color: "#080808", fontSize: "14px", fontWeight: "600", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "var(--font-sans)", marginTop: "4px" }}>
            {loading ? "Authorizing..." : "Authorize CLI"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function CliAuthPage() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "var(--bg)" }}>
      <Suspense fallback={<div style={{ color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>Loading...</div>}>
        <CliAuthContent />
      </Suspense>
    </main>
  );
}
