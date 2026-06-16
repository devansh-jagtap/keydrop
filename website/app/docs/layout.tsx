import DocsSidebar from "@/components/docs/docs-sidebar";
import Navbar from "@/components/layout/navbar";

export const metadata = {
  title: "Docs — KeyDrop",
  description:
    "KeyDrop documentation. Learn how to turn your .env into one secure deployable key.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "100px 24px 80px",
          display: "flex",
          gap: "48px",
        }}
      >
        <DocsSidebar />
        <main style={{ flex: 1, minWidth: 0 }}>{children}</main>
      </div>
    </div>
  );
}
