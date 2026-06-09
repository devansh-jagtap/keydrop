"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getGoogleAuthUrl, login } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleLogin() {
    const url = getGoogleAuthUrl({ next: "/dashboard" });

    if (!url) {
      setError("Google sign-in is not configured");
      return;
    }

    window.location.href = url;
  }

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "var(--bg)" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>

        {/* logo */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "var(--accent)", color: "#080808", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700" }}>K</div>
            <span style={{ fontSize: "18px", fontWeight: "600", color: "var(--text)", fontFamily: "var(--font-sans)" }}>KeyDrop</span>
          </Link>
          <p style={{ marginTop: "24px", fontSize: "24px", fontWeight: "700", color: "var(--text)", fontFamily: "var(--font-sans)", letterSpacing: "-0.03em" }}>Welcome back</p>
          <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>Sign in to your account</p>
        </div>

        {/* form */}
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-strong)", borderRadius: "16px", padding: "32px" }}>
          <button
            type="button"
            onClick={handleGoogleLogin}
            style={{ width: "100%", padding: "11px", borderRadius: "10px", background: "var(--bg-secondary)", color: "var(--text)", fontSize: "14px", fontWeight: "600", border: "1px solid var(--border-strong)", cursor: "pointer", fontFamily: "var(--font-sans)", marginBottom: "16px" }}
          >
            Continue with Google
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ height: "1px", flex: 1, background: "var(--border)" }} />
            <span style={{ color: "var(--text-secondary)", fontSize: "12px", fontFamily: "var(--font-sans)" }}>or</span>
            <div style={{ height: "1px", flex: 1, background: "var(--border)" }} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {error && (
              <div style={{ padding: "12px 16px", borderRadius: "10px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", fontSize: "13px", color: "#ef4444", fontFamily: "var(--font-sans)" }}>
                {error}
              </div>
            )}

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "var(--text-secondary)", marginBottom: "8px", fontFamily: "var(--font-sans)" }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid var(--border-strong)", background: "var(--bg-secondary)", color: "var(--text)", fontSize: "14px", fontFamily: "var(--font-sans)", outline: "none" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-strong)")}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "var(--text-secondary)", marginBottom: "8px", fontFamily: "var(--font-sans)" }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid var(--border-strong)", background: "var(--bg-secondary)", color: "var(--text)", fontSize: "14px", fontFamily: "var(--font-sans)", outline: "none" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-strong)")}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "11px", borderRadius: "10px", background: "var(--accent)", color: "#080808", fontSize: "14px", fontWeight: "600", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "var(--font-sans)", marginTop: "8px", transition: "opacity 0.2s" }}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
          Don&apos;t have an account?{" "}
          <Link href="/register" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: "500" }}>
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
