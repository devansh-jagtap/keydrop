"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction", href: "/docs", badge: null },
      { label: "How it Works", href: "/docs/how-it-works", badge: null },
      { label: "Quick Start", href: "/docs/getting-started", badge: null },
    ],
  },
  {
    title: "Guides",
    items: [
      { label: "Framework Support", href: "/docs/frameworks", badge: null },
      { label: "Deploy Anywhere", href: "/docs/deployment", badge: null },
    ],
  },
  {
    title: "CLI Reference",
    items: [
      { label: "Overview", href: "/docs/cli", badge: null },
      { label: "login", href: "/docs/cli#login", badge: null },
      { label: "push", href: "/docs/cli#push", badge: null },
      { label: "run", href: "/docs/cli#run", badge: null },
      { label: "pull", href: "/docs/cli#pull", badge: null },
    ],
  },
  {
    title: "SDK Reference",
    items: [
      { label: "Overview", href: "/docs/sdk", badge: null },
      { label: "init()", href: "/docs/sdk#init", badge: null },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Security", href: "/docs/security", badge: null },
    ],
  },
];

export default function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "280px",
        flexShrink: 0,
        position: "sticky",
        top: "100px",
        height: "calc(100vh - 120px)",
        overflowY: "auto",
        paddingRight: "24px",
      }}
    >
      {navItems.map((section) => (
        <div key={section.title} style={{ marginBottom: "28px" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "10px",
              fontFamily: "var(--font-sans)",
            }}
          >
            {section.title}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {section.items.map((item) => {
              const isActive = pathname === item.href.split("#")[0];
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "7px 12px",
                    borderRadius: "6px",
                    fontSize: "14px",
                    color: isActive ? "var(--text)" : "var(--text-secondary)",
                    textDecoration: "none",
                    fontFamily: "var(--font-sans)",
                    background: isActive ? "var(--bg-secondary)" : "transparent",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "var(--bg-secondary)";
                      e.currentTarget.style.color = "var(--text)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }
                  }}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: "600",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        background: "var(--bg-secondary)",
                        padding: "2px 6px",
                        borderRadius: "4px",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </aside>
  );
}
