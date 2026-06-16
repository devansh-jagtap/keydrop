"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer
      style={{ padding: "0 24px 48px", maxWidth: "900px", margin: "0 auto" }}
    >
      <div
        className="footer-inner"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          paddingTop: "32px",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Image
            src="/svglogo.webp"
            alt="KeyDrop Logo"
            width={32}
            height={32}
            unoptimized
            style={{
              borderRadius: "6px",
              filter: "var(--logo-filter)",
              transform: "scale(2.0)",
            }}
          />
          <span
            style={{
              fontSize: "13px",
              fontWeight: "600",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-sans)",
            }}
          >
            KeyDrop
          </span>
        </div>

        <p
          style={{
            fontSize: "13px",
            color: "var(--text-muted)",
            fontFamily: "var(--font-sans)",
          }}
        >
          Turn your .env into one key. Deploy anywhere.
        </p>

        <div style={{ display: "flex", gap: "24px" }}>
          {[
            { label: "npm", href: "https://www.npmjs.com/package/keydrop" },
            {
              label: "GitHub",
              href: "https://github.com/devansh-jagtap/keydrop",
            },
            { label: "Dashboard", href: "/dashboard" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              style={{
                fontSize: "13px",
                color: "var(--text-muted)",
                textDecoration: "none",
                fontFamily: "var(--font-sans)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <p
        style={{
          textAlign: "center",
          fontSize: "12px",
          color: "var(--text-muted)",
          marginTop: "32px",
        }}
      >
        © {new Date().getFullYear()} KeyDrop · Built by{" "}
        <a
          href="https://github.com/devansh-jagtap"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--text-muted)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-muted)")
          }
        >
          Devansh Jagtap
        </a>
      </p>
    </footer>
  );
}
