"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { ThemeToggleShell } from "@/components/ui/theme-toggle-shell";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4"
      style={{ paddingTop: "20px" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
           gap: "32px",
           padding: "10px 20px",
           borderRadius: "9999px",
           background: scrolled ? "var(--nav-bg-scrolled)" : "var(--nav-bg)",
           border: "1px solid var(--border-strong)",
           backdropFilter: "blur(20px)",
           transition: "all 0.4s ease",
          boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.5)" : "none",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          <Image
            src="/svglogo.webp"
            alt="KeyDrop Logo"
            width={36}
            height={36}
            unoptimized
            style={{ borderRadius: "6px", filter: "var(--logo-filter)", transform: "scale(2.0)" }}
          />
          <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--text)", fontFamily: "var(--font-sans)" }}>
            KeyDrop
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {[
            { label: "How it works", href: "#how-it-works" },
            { label: "Docs", href: "/docs" },
            { label: "GitHub", href: "https://github.com/devansh-jagtap/keydrop", external: true },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              style={{ fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none", fontFamily: "var(--font-sans)", transition: "color 0.2s" }}
              onClick={(e) => {
                if (item.href.startsWith("#")) {
                  e.preventDefault();
                  const el = document.querySelector(item.href);
                  el?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <ThemeToggleShell />
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button
                type="button"
                style={{ fontSize: "13px", fontWeight: "500", padding: "7px 16px", borderRadius: "9999px", border: "1px solid var(--border-strong)", background: "transparent", color: "var(--text-secondary)", textDecoration: "none", fontFamily: "var(--font-sans)", transition: "color 0.2s, border-color 0.2s", cursor: "pointer" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.borderColor = "var(--border-strong)";
                }}
              >
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button
                type="button"
                style={{ fontSize: "13px", fontWeight: "600", padding: "7px 18px", borderRadius: "9999px", border: "none", background: "var(--accent)", color: "var(--accent-text)", textDecoration: "none", fontFamily: "var(--font-sans)", transition: "opacity 0.2s", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Sign up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link
              href="/dashboard"
              style={{ fontSize: "13px", fontWeight: "600", padding: "7px 18px", borderRadius: "9999px", background: "var(--accent)", color: "var(--accent-text)", textDecoration: "none", fontFamily: "var(--font-sans)", transition: "opacity 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Dashboard
            </Link>
            <UserButton />
          </Show>
        </div>
      </div>
    </nav>
  );
}
