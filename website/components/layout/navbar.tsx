"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { ThemeToggleShell } from "@/components/ui/theme-toggle-shell";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works", external: false },
  { label: "Docs", href: "/docs", external: false },
  {
    label: "GitHub",
    href: "https://github.com/devansh-jagtap/keydrop",
    external: true,
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu when user scrolls
  useEffect(() => {
    if (!mobileOpen) return;
    const close = () => setMobileOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [mobileOpen]);

  function handleLinkClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4"
        style={{ paddingTop: "20px" }}
      >
        <div
          className="nav-pill"
          style={{
            padding: "10px 20px",
            borderRadius: "9999px",
            background: scrolled ? "var(--nav-bg-scrolled)" : "var(--nav-bg)",
            border: "1px solid var(--border-strong)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            transition: "all 0.4s ease",
            boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.5)" : "none",
          }}
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
              flexShrink: 0,
            }}
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/svglogo.webp"
              alt="KeyDrop Logo"
              width={36}
              height={36}
              unoptimized
              style={{
                borderRadius: "6px",
                filter: "var(--logo-filter)",
                transform: "scale(2.0)",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "var(--text)",
                fontFamily: "var(--font-sans)",
              }}
            >
              KeyDrop
            </span>
          </Link>

          {/* ── Desktop Nav Links (hidden on mobile via CSS class) ── */}
          <div className="nav-links">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontFamily: "var(--font-sans)",
                  transition: "color 0.2s",
                }}
                onClick={(e) => handleLinkClick(e, item.href)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
                }
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* ── Desktop Auth Actions (hidden on mobile via CSS class) ── */}
          <div className="nav-actions">
            <ThemeToggleShell />
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button
                  type="button"
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    padding: "7px 16px",
                    borderRadius: "9999px",
                    border: "1px solid var(--border-strong)",
                    background: "transparent",
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-sans)",
                    transition: "color 0.2s, border-color 0.2s",
                    cursor: "pointer",
                  }}
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
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    padding: "7px 18px",
                    borderRadius: "9999px",
                    border: "none",
                    background: "var(--accent)",
                    color: "var(--accent-text)",
                    fontFamily: "var(--font-sans)",
                    transition: "opacity 0.2s",
                    cursor: "pointer",
                  }}
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
                prefetch={false}
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  padding: "7px 18px",
                  borderRadius: "9999px",
                  background: "var(--accent)",
                  color: "var(--accent-text)",
                  textDecoration: "none",
                  fontFamily: "var(--font-sans)",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Dashboard
              </Link>
              <UserButton />
            </Show>
          </div>

          {/* ── Mobile Hamburger (shown only on mobile via CSS class) ── */}
          <button
            className="nav-hamburger"
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              /* X / close icon */
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <>
          {/* Backdrop — closes menu on outside tap */}
          <div
            className="nav-mobile-backdrop"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Dropdown panel */}
          <div
            className="nav-mobile-menu"
            role="dialog"
            aria-label="Navigation menu"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="nav-mobile-link"
                onClick={(e) => handleLinkClick(e, item.href)}
              >
                {item.label}
              </a>
            ))}

            <div className="nav-mobile-divider" />

            <div className="nav-mobile-actions">
              <ThemeToggleShell />
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button
                    type="button"
                    className="nav-mobile-btn-outline"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button
                    type="button"
                    className="nav-mobile-btn-accent"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign up
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <Link
                  href="/dashboard"
                  prefetch={false}
                  className="nav-mobile-btn-accent"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
                <UserButton />
              </Show>
            </div>
          </div>
        </>
      )}
    </>
  );
}
