"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({
  code,
  language = "bash",
  filename,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const lines = code.split("\n");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      style={{
        borderRadius: "14px",
        overflow: "hidden",
        border: "1px solid var(--border)",
        background: "var(--bg-card)",
        width: "100%",
        maxWidth: "100%",
      }}
    >
      {filename && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            padding: "12px 16px",
            borderBottom: "1px solid var(--border)",
            background: "var(--bg-secondary)",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-mono)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {filename}
          </span>

          {language && (
            <span
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: ".05em",
                flexShrink: 0,
              }}
            >
              {language}
            </span>
          )}
        </div>
      )}

      <div
        style={{
          position: "relative",
        }}
      >
        {!filename && (
          <button
            onClick={handleCopy}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              zIndex: 2,
              padding: "6px",
              borderRadius: "8px",
              background: "var(--bg)",
              border: "1px solid var(--border)",
              color: "var(--text-muted)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {copied ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect
                  x="9"
                  y="9"
                  width="13"
                  height="13"
                  rx="2"
                  ry="2"
                />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        )}

        <div
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            WebkitOverflowScrolling: "touch",
            width: "100%",
          }}
        >
          <pre
            style={{
              padding: "18px",
              margin: 0,
              minWidth: "max-content",
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              lineHeight: "1.7",
              color: "var(--text)",
            }}
          >
            {showLineNumbers ? (
              <code>
                {lines.map((line, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "16px",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--text-muted)",
                        userSelect: "none",
                        minWidth: "28px",
                        textAlign: "right",
                        flexShrink: 0,
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
              <code>{code}</code>
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}