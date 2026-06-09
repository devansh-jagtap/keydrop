"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmCliToken, loginWithGoogle, parseGoogleAuthState } from "@/lib/api";

function GoogleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [cliDone, setCliDone] = useState(false);
  const code = searchParams.get("code");
  const oauthError = searchParams.get("error");
  const state = parseGoogleAuthState(searchParams.get("state"));
  const initialError = oauthError
    ? "Google sign-in was cancelled or failed"
    : !code
      ? "Missing Google authorization code"
      : "";

  useEffect(() => {
    if (initialError) {
      return;
    }

    async function completeGoogleLogin() {
      try {
        const redirectUri = `${window.location.origin}/auth/google/callback`;
        const data = await loginWithGoogle(code!, redirectUri);

        if (state.cliToken) {
          await confirmCliToken(state.cliToken, data.token);
          setCliDone(true);
          return;
        }

        router.replace(state.next || "/dashboard");
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Google sign-in failed");
      }
    }

    completeGoogleLogin();
  }, [code, initialError, router, state.cliToken, state.next]);

  if (cliDone) {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>OK</div>
        <p style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Logged in</p>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>You can close this tab and return to your terminal.</p>
      </div>
    );
  }

  const displayError = initialError || error;

  if (displayError) {
    return (
      <div style={{ textAlign: "center", maxWidth: "360px" }}>
        <p style={{ fontSize: "18px", fontWeight: "600", color: "var(--text)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Google sign-in failed</p>
        <p style={{ fontSize: "14px", color: "#ef4444", fontFamily: "var(--font-sans)", marginBottom: "20px" }}>{displayError}</p>
        <Link href="/login" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: "500", fontFamily: "var(--font-sans)" }}>
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ fontSize: "18px", fontWeight: "600", color: "var(--text)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Signing you in</p>
      <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>Connecting your Google account...</p>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "var(--bg)" }}>
      <Suspense fallback={<div style={{ color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>Loading...</div>}>
        <GoogleCallbackContent />
      </Suspense>
    </main>
  );
}
