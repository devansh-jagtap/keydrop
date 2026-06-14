"use client";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <aside
      style={{
        width: "200px",
        flexShrink: 0,
        position: "sticky",
        top: "100px",
        height: "fit-content",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          fontWeight: "600",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          marginBottom: "16px",
          fontFamily: "var(--font-sans)",
        }}
      >
        On this page
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            style={{
              display: "block",
              fontSize: "13px",
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontFamily: "var(--font-sans)",
              paddingLeft: item.level === 2 ? "0" : "12px",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            {item.title}
          </a>
        ))}
      </div>
    </aside>
  );
}
