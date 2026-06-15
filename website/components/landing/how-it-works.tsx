"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Install",
    description:
      "Install both the KeyDrop CLI and SDK. The CLI handles secret management and build-time injection. The SDK handles runtime secret loading.",
    commands: ["npm install keydrop", "npm install -g keydrop-cli"],
  },
  {
    number: "02",
    title: "Push",
    description:
      "Upload your existing .env file. Your secrets are securely stored and replaced with a single project key.",
    commands: ["keydrop login", "keydrop push"],
  },
  {
    number: "03",
    title: "Run",
    description:
      "Use keydrop run for development and builds. Call init() at runtime to load secrets into process.env.",
    commands: [
      "keydrop run -- npm run dev",
      "keydrop run -- next build",
      'import { init } from "keydrop"; await init();',
    ],
  },
];

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      style={{ padding: "60px 24px 120px", maxWidth: "1100px", margin: "0 auto" }}
    >
      <div
        style={{ marginBottom: "64px" }}
        className={isVisible ? "animate-fade-up delay-1" : "opacity-0"}
      >
        <p
          style={{
            fontSize: "11px",
            fontWeight: "500",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "16px",
            fontFamily: "var(--font-sans)",
          }}
        >
          How it works
        </p>
        <h2
          style={{
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            fontWeight: "700",
            letterSpacing: "-0.04em",
            lineHeight: "1.05",
            fontFamily: "var(--font-sans)",
            color: "var(--text)",
          }}
        >
          Three steps.
          <br />
          <span style={{ color: "var(--text-muted)" }}>That&apos;s all.</span>
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {steps.map((step, i) => (
          <div
            key={step.number}
            className={isVisible ? `animate-fade-up delay-${i + 2}` : "opacity-0"}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "32px",
              borderRadius: "16px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              transition: "border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "#22d3a5";
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: "700",
                fontSize: "42px",
                color: "var(--border-strong)",
                lineHeight: "1",
              }}
            >
              {step.number}
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {step.commands.map((command, commandIndex) => {
                const key = `${i}-${commandIndex}`;
                const isCode = command.includes("import");
                return (
                  <div
                    key={key}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      padding: "12px",
                      borderRadius: "10px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid var(--border)",
                      color: "var(--accent)",
                      wordBreak: "break-all",
                      minHeight: "56px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    <div>{isCode ? command : `$ ${command}`}</div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(command);
                        setCopiedKey(key);
                        setTimeout(() => setCopiedKey(null), 2000);
                      }}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: copiedKey === key ? "var(--accent)" : "var(--text-muted)",
                        padding: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "color 0.2s",
                        flexShrink: 0,
                      }}
                      title="Copy command"
                    >
                      {copiedKey === key ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: "auto" }}>
              <p
                style={{
                  fontWeight: "600",
                  fontSize: "17px",
                  color: "var(--text)",
                  marginBottom: "8px",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {step.title}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: "1.6",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
