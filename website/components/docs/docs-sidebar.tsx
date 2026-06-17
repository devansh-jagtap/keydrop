"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction", href: "/docs" },
      { label: "How it Works", href: "/docs/how-it-works" },
      { label: "Quick Start", href: "/docs/getting-started" },
    ],
  },
  {
    title: "Guides",
    items: [
      { label: "Framework Support", href: "/docs/frameworks" },
      { label: "Deploy Anywhere", href: "/docs/deployment" },
    ],
  },
  {
    title: "CLI Reference",
    items: [
      { label: "Overview", href: "/docs/cli" },
      { label: "login", href: "/docs/cli#login" },
      { label: "push", href: "/docs/cli#push" },
      { label: "run", href: "/docs/cli#run" },
      { label: "pull", href: "/docs/cli#pull" },
    ],
  },
  {
    title: "SDK Reference",
    items: [
      { label: "Overview", href: "/docs/sdk" },
      { label: "init()", href: "/docs/sdk#init" },
    ],
  },
  {
    title: "Resources",
    items: [{ label: "Security", href: "/docs/security" }],
  },
];

export default function DocsSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}

      <div
        className="mobile-docs-nav"
        style={{
          display: "none",
          marginBottom: "16px",
        }}
      >
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: "12px",
            border: "1px solid var(--border)",
            background: "var(--bg-card)",
            color: "var(--text)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Documentation

          <span
            style={{
              transition: "transform .2s ease",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            ▼
          </span>
        </button>
      </div>

      <aside
        className={`docs-sidebar ${open ? "open" : ""}`}
        style={{
          width: "280px",
          flexShrink: 0,
          position: "sticky",
          top: "96px",
          height: "calc(100vh - 120px)",
          overflowY: "auto",
          paddingRight: "20px",
        }}
      >
        {navItems.map((section) => (
          <div
            key={section.title}
            style={{
              marginBottom: "28px",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "10px",
              }}
            >
              {section.title}
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              {section.items.map((item) => {
                const isActive =
                  pathname === item.href.split("#")[0];

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 12px",
                      borderRadius: "10px",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: isActive ? 600 : 500,
                      color: isActive
                        ? "var(--text)"
                        : "var(--text-secondary)",
                      background: isActive
                        ? "var(--bg-secondary)"
                        : "transparent",
                      transition: ".15s ease",
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </aside>

      <style jsx>{`
        .docs-sidebar::-webkit-scrollbar {
          width: 6px;
        }

        .docs-sidebar::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 999px;
        }

        @media (max-width: 768px) {
          .mobile-docs-nav {
            display: block !important;
          }

          .docs-sidebar {
            width: 100% !important;
            position: relative !important;
            top: 0 !important;
            height: auto !important;
            overflow: hidden !important;
            padding-right: 0 !important;

            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 16px;

            max-height: 0;
            opacity: 0;

            transition: all 0.25s ease;
          }

          .docs-sidebar.open {
            max-height: 1500px;
            opacity: 1;
            padding: 20px !important;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </>
  );
}