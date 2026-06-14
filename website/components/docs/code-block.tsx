"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({ code, language = "bash", filename, showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const lines = code.split("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid var(--border)",
        background: "var(--bg-card)",
      }}
    >
      {filename && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            borderBottom: "1px solid var(--border)",
            background: "var(--bg-secondary)",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {filename}
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {language && (
              <span
                style={{
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-sans)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {language}
              </span>
            )}
          </div>
        </div>
      )}
      <div style={{ position: "relative" }}>
        {!filename && (
          <button
            onClick={handleCopy}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              padding: "6px",
              borderRadius: "6px",
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--text-muted)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--bg-secondary)";
              e.currentTarget.style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        )}
        <pre
          style={{
            padding: "16px 20px",
            margin: 0,
            overflowX: "auto",
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            lineHeight: "1.7",
            color: "var(--text)",
          }}
        >
          {showLineNumbers ? (
            <code>
              {lines.map((line, i) => (
                <div key={i} style={{ display: "flex", gap: "16px" }}>
                  <span
                    style={{
                      color: "var(--text-muted)",
                      userSelect: "none",
                      minWidth: "24px",
                      textAlign: "right",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    style={{
                      color: line.startsWith("$")
                        ? "var(--accent)"
                        : line.startsWith("#")
                        ? "var(--text-muted)"
                        : "var(--text)",
                    }}
                  >
                    {line || " "}
                  </span>
                </div>
              ))}
            </code>
          ) : (
            <code style={{ color: "var(--text)" }}>{code}</code>
          )}
        </pre>
      </div>
    </div>
  );
}
