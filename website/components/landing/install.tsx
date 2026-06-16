"use client";

import { useState } from "react";

const installOptions = [
  {
    id: "quick-run",
    title: "Quick Start",
    subtitle: "Get started in minutes",
    icon: null,
    commands: [
      {
        label: "Install SDK + CLI",
        code: "npm install keydrop\nnpm install -g keydrop-cli",
      },
      { label: "Login", code: "keydrop login" },
      { label: "Upload secrets", code: "keydrop push" },
      { label: "Run your application", code: "keydrop run -- npm run dev" },
      { label: "Deploy with one key", code: "KEYDROP_KEY=proj_xxxxxxxxx" },
    ],
  },
  {
    id: "node",
    title: "Node.js",
    subtitle: "Express, Fastify, Hono, NestJS",
    icon: "/icons/nodedotjs.svg",
    commands: [
      {
        label: "Install SDK + CLI",
        code: "npm install keydrop\nnpm install -g keydrop-cli",
      },
      { label: "Login and push secrets", code: "keydrop login\nkeydrop push" },
      { label: "Development", code: "keydrop run -- npm start" },
      {
        label: "Runtime secret loading",
        code: 'import { init } from "keydrop";\n\nawait init();',
      },
      { label: "Deploy anywhere", code: "KEYDROP_KEY=proj_xxxxxxxxx" },
    ],
  },
  {
    id: "next",
    title: "Next.js",
    subtitle: "App Router, Vercel, NEXT_PUBLIC variables",
    icon: "/icons/nextdotjs.svg",
    commands: [
      {
        label: "Install SDK + CLI",
        code: "npm install keydrop\nnpm install -g keydrop-cli",
      },
      { label: "Login and push secrets", code: "keydrop login\nkeydrop push" },
      {
        label: "Build-time secret injection",
        code: "keydrop run -- next build",
      },
      {
        label: "Runtime secret loading",
        code: 'import { init } from "keydrop";\n\nawait init();',
      },
      { label: "Deploy anywhere", code: "KEYDROP_KEY=proj_xxxxxxxxx" },
    ],
  },
  {
    id: "coming-soon",
    title: "Coming soon",
    subtitle: "More frameworks and deployment guides are on the way.",
    commands: [],
  },
];

export default function Install() {
  const [activeInstall, setActiveInstall] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  return (
    <>
      <section
        id="install"
        className="install-section"
        style={{ padding: "0 24px 96px", maxWidth: "1260px", margin: "0 auto" }}
      >
        {/*
          .install-inner-card owns border-radius + padding so the
          globals.css media query can override them on mobile without
          needing !important on the inline style.
        */}
        <div
          className="install-inner-card"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.015))",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 18px 80px rgba(0,0,0,0.35)",
          }}
        >
          {/* HEADING */}
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <p
              style={{
                fontSize: "11px",
                fontWeight: "500",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "14px",
                fontFamily: "var(--font-sans)",
              }}
            >
              Get started
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                fontWeight: "700",
                letterSpacing: "-0.05em",
                lineHeight: "1.05",
                fontFamily: "var(--font-sans)",
                color: "var(--text)",
              }}
            >
              Up and running
              <br />
              <span style={{ color: "var(--text-muted)" }}>in minutes.</span>
            </h2>
          </div>

          {/* INSTALL CARDS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              justifyContent: "center",
              gap: "18px",
            }}
          >
            {installOptions.map((item) => (
              <button
                key={item.id}
                type="button"
                disabled={item.id === "coming-soon"}
                onClick={() => {
                  if (item.id !== "coming-soon") setActiveInstall(item.id);
                }}
                style={{
                  background:
                    item.id === "coming-soon"
                      ? "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))"
                      : "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "30px",
                  padding: "28px 24px",
                  cursor: item.id === "coming-soon" ? "default" : "pointer",
                  textAlign: "center",
                  transition:
                    "transform 0.25s ease, border 0.25s ease, background 0.25s ease",
                  minHeight: "224px",
                  opacity: item.id === "coming-soon" ? 0.82 : 1,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  if (item.id === "coming-soon") return;
                  e.currentTarget.style.border =
                    "1px solid rgba(255,255,255,0.14)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.background =
                    "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.028))";
                }}
                onMouseLeave={(e) => {
                  if (item.id === "coming-soon") return;
                  e.currentTarget.style.border =
                    "1px solid rgba(255,255,255,0.06)";
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.background =
                    item.id === "coming-soon"
                      ? "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))"
                      : "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.02))";
                }}
              >
                {item.icon ? (
                  <div
                    style={{
                      width: "84px",
                      height: "84px",
                      borderRadius: "26px",
                      background: "#ffffff",
                      border: "1px solid rgba(0,0,0,0.08)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "22px",
                    }}
                  >
                    <img
                      src={item.icon}
                      alt={item.title}
                      style={{
                        width: "44px",
                        height: "44px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                ) : item.id === "quick-run" ? (
                  <div
                    style={{
                      width: "84px",
                      height: "84px",
                      borderRadius: "26px",
                      background: "rgba(34,211,165,0.12)",
                      border: "1px solid rgba(34,211,165,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "22px",
                      color: "var(--accent)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "22px",
                      fontWeight: "700",
                    }}
                  >
                    $
                  </div>
                ) : (
                  <div
                    style={{
                      width: "84px",
                      height: "84px",
                      borderRadius: "26px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "22px",
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "12px",
                      fontWeight: "600",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    Soon
                  </div>
                )}
                <h3
                  style={{
                    fontSize: "21px",
                    fontWeight: "600",
                    marginBottom: "10px",
                    color: "var(--text)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "14px",
                    lineHeight: "1.7",
                    fontFamily: "var(--font-sans)",
                    maxWidth: "220px",
                  }}
                >
                  {item.subtitle}
                </p>
              </button>
            ))}
          </div>

          {/* BUTTONS */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "56px",
            }}
          >
            <a
              href="https://www.npmjs.com/package/keydrop"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "12px 26px",
                borderRadius: "9999px",
                fontSize: "14px",
                fontWeight: "600",
                background: "var(--accent)",
                color: "#080808",
                textDecoration: "none",
                fontFamily: "var(--font-sans)",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              View on npm ↗
            </a>

            <a
              href="https://github.com/devansh-jagtap/keydrop"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "12px 26px",
                borderRadius: "9999px",
                fontSize: "14px",
                fontWeight: "500",
                border: "1px solid var(--border-strong)",
                color: "var(--text-secondary)",
                textDecoration: "none",
                fontFamily: "var(--font-sans)",
                transition: "0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* DRAWER OVERLAY */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: activeInstall ? "rgba(0,0,0,0.45)" : "transparent",
          pointerEvents: activeInstall ? "all" : "none",
          transition: "0.25s ease",
          zIndex: 999,
        }}
        onClick={() => setActiveInstall(null)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: activeInstall ? "0px" : "-100%",
            transition: "0.35s cubic-bezier(0.22,1,0.36,1)",
            background: "var(--bg-card)",
            borderTop: "1px solid var(--border-strong)",
            borderTopLeftRadius: "32px",
            borderTopRightRadius: "32px",
            padding: "42px 24px",
            maxHeight: "85vh",
            overflowY: "auto",
          }}
        >
          {installOptions
            .filter((item) => item.id === activeInstall)
            .map((item) => (
              <div
                key={item.id}
                style={{ maxWidth: "920px", margin: "0 auto" }}
              >
                <div
                  style={{
                    width: "70px",
                    height: "6px",
                    borderRadius: "999px",
                    background: "var(--border)",
                    margin: "0 auto 32px",
                  }}
                />
                <h2
                  style={{
                    fontSize: "2rem",
                    marginBottom: "10px",
                    color: "var(--text)",
                    fontFamily: "var(--font-sans)",
                    textAlign: "center",
                  }}
                >
                  {item.title} setup
                </h2>
                <p
                  style={{
                    color: "var(--text-muted)",
                    marginBottom: "40px",
                    fontFamily: "var(--font-sans)",
                    textAlign: "center",
                  }}
                >
                  {item.subtitle}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  {item.commands.map((cmd, i) => (
                    <div key={i}>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "var(--text-muted)",
                          marginBottom: "10px",
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        {i + 1}. {cmd.label}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "12px",
                          padding: "16px 18px",
                          borderRadius: "16px",
                          background: "var(--bg-secondary)",
                          border: "1px solid var(--border)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "14px",
                          lineHeight: "1.7",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "12px",
                            overflowX: "auto",
                          }}
                        >
                          <span
                            style={{
                              color: "var(--text-muted)",
                              marginTop: "1px",
                            }}
                          >
                            $
                          </span>
                          <span
                            style={{
                              color: "var(--text)",
                              wordBreak: "break-word",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {cmd.code}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(cmd.code);
                            setCopiedIndex(i);
                            setTimeout(() => setCopiedIndex(null), 2000);
                          }}
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color:
                              copiedIndex === i
                                ? "var(--accent)"
                                : "var(--text-muted)",
                            padding: "4px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "color 0.2s",
                            flexShrink: 0,
                          }}
                          title="Copy command"
                          onMouseEnter={(e) => {
                            if (copiedIndex !== i)
                              e.currentTarget.style.color = "var(--text)";
                          }}
                          onMouseLeave={(e) => {
                            if (copiedIndex !== i)
                              e.currentTarget.style.color = "var(--text-muted)";
                          }}
                        >
                          {copiedIndex === i ? (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          ) : (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect
                                x="9"
                                y="9"
                                width="13"
                                height="13"
                                rx="2"
                                ry="2"
                              ></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
