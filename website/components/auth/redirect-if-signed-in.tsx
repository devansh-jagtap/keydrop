"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type RedirectIfSignedInProps = {
  to?: string;
};

export default function RedirectIfSignedIn({ to = "/dashboard" }: RedirectIfSignedInProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace(to);
      router.refresh();
    }
  }, [isLoaded, isSignedIn, router, to]);

  return null;
}
