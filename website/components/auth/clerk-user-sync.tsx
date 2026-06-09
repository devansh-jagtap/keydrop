"use client";

import { useEffect, useRef } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { createKeydropTokenFromClerk } from "@/lib/api";

export default function ClerkUserSync() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();
  const syncInFlight = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isUserLoaded || !isSignedIn || !user?.id || syncInFlight.current) {
      return;
    }

    const storageKey = `keydrop_clerk_synced:${user.id}`;
    if (sessionStorage.getItem(storageKey) === "1") {
      return;
    }

    let active = true;
    syncInFlight.current = true;

    async function syncUser() {
      try {
        const clerkToken = await getToken();
        await createKeydropTokenFromClerk(clerkToken, {
          email: user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress || null,
          name: user.fullName || user.username || null,
          avatarUrl: user.imageUrl || null,
        });

        if (active) {
          sessionStorage.setItem(storageKey, "1");
        }
      } catch {
        if (active) {
          sessionStorage.removeItem(storageKey);
        }
      } finally {
        if (active) {
          syncInFlight.current = false;
        }
      }
    }

    syncUser();

    return () => {
      active = false;
    };
  }, [getToken, isLoaded, isSignedIn, isUserLoaded, user]);

  return null;
}