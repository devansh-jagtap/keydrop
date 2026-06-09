"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Show, SignIn, UserButton, useAuth } from "@clerk/nextjs";
import { confirmCliToken, createKeydropTokenFromClerk } from "@/lib/api";

function CliAuthContent() {
  const searchParams = useSearchParams();
  const cliToken = searchParams.get("token");
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !cliToken || done) {
      return;
    }

    async function authorizeCli() {
      try {
        const clerkToken = await getToken();
        const keydropSession = await createKeydropTokenFromClerk(clerkToken);
        await confirmCliToken(cliToken!, keydropSession.token);
        setDone(true);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "CLI authorization failed");
      }
    }

    authorizeCli();
  }, [cliToken, done, getToken, isLoaded, isSignedIn]);

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
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>OK</div>
        <p style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", fontFamily: "var(--font-sans)", marginBottom: "8px" }}>Logged in</p>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>You can close this tab and return to your terminal.</p>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", maxWidth: "440px" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "var(--accent)", color: "#080808", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", margin: "0 auto 16px" }}>K</div>
        <p style={{ fontSize: "20px", fontWeight: "600", color: "var(--text)", fontFamily: "var(--font-sans)", marginBottom: "4px" }}>Authorize CLI</p>
        <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>Sign in with Clerk to authorize the KeyDrop CLI</p>
      </div>

      {error && (
        <div style={{ padding: "10px 14px", borderRadius: "8px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", fontSize: "13px", color: "#ef4444", fontFamily: "var(--font-sans)", marginBottom: "16px" }}>
          {error}
        </div>
      )}

      <Show when="signed-out">
        <SignIn
          signUpUrl="/register"
          forceRedirectUrl={`/auth/cli?token=${encodeURIComponent(cliToken)}`}
        />
      </Show>

      <Show when="signed-in">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
          <UserButton />
          <span>Authorizing...</span>
        </div>
      </Show>
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
