"use client";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export default function TableOfContents({
  items,
}: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <>
      <aside className="docs-toc">
        <p
          style={{
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: "16px",
          }}
        >
          On this page
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={{
                display: "block",
                fontSize: "13px",
                color: "var(--text-secondary)",
                textDecoration: "none",
                paddingLeft:
                  item.level === 2 ? "0" : "12px",
                transition: "color .15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color =
                  "var(--text)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  "var(--text-secondary)")
              }
            >
              {item.title}
            </a>
          ))}
        </div>
      </aside>

      <style jsx>{`
        .docs-toc {
          width: 220px;
          flex-shrink: 0;
          position: sticky;
          top: 100px;
          height: fit-content;
        }

        @media (max-width: 1024px) {
          .docs-toc {
            display: none;
          }
        }
      `}</style>
    </>
  );
}