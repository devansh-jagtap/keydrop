"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthenticateWithRedirectCallback, useAuth, useUser } from "@clerk/nextjs";
import { createKeydropTokenFromClerk } from "@/lib/api";

export default function LoginSsoCallbackPage() {
  const router = useRouter();
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoaded || !isUserLoaded || !isSignedIn) {
      return;
    }

    let active = true;

    async function syncUser() {
      try {
        const clerkToken = await getToken();
        await createKeydropTokenFromClerk(clerkToken, {
          email: user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || null,
          name: user?.fullName || user?.username || null,
          avatarUrl: user?.imageUrl || null,
        });

        if (active) {
          router.replace("/dashboard");
        }
      } catch (err: unknown) {
        if (active) {
          setError(err instanceof Error ? err.message : "Unable to finish sign-in");
        }
      }
    }

    syncUser();

    return () => {
      active = false;
    };
  }, [getToken, isLoaded, isSignedIn, isUserLoaded, router, user]);

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "var(--bg)" }}>
      <div style={{ textAlign: "center" }}>
        <AuthenticateWithRedirectCallback />
        {error ? (
          <p style={{ marginTop: "16px", color: "#ef4444", fontFamily: "var(--font-sans)" }}>{error}</p>
        ) : (
          <p style={{ marginTop: "16px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>Completing sign-in...</p>
        )}
      </div>
    </main>
  );
}