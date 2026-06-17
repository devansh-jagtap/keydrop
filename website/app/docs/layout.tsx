import DocsSidebar from "@/components/docs/docs-sidebar";
import Navbar from "@/components/layout/navbar";
import "./docs.css";

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
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
      }}
    >
      <Navbar />

      <div className="docs-layout">
        <DocsSidebar />

        <main className="docs-main">
          {children}
        </main>
      </div>
    </div>
  );
}