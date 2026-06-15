"use client";

import { RandomizedTextEffect } from "@/components/ui/randomized-text";
import TextAnimation from "@/components/ui/scroll-text";
import SmoothWavyCanvas from "@/components/ui/background";
import ButtonCreative from "@/components/ui/button-creative";

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px 20px",
        textAlign: "center",
        position: "relative",
      }}
    >
      <SmoothWavyCanvas
        backgroundColor="var(--bg-canvas)"
        primaryColor="34, 211, 165"
        secondaryColor="20, 160, 120"
        accentColor="34, 211, 165"
        lineOpacity={1.5}
        animationSpeed={0.004}
      />

      {/* headline */}
      <h1
        className="animate-fade-up delay-2"
        style={{
          fontSize: "clamp(3rem, 7vw, 6rem)",
          fontWeight: "700",
          letterSpacing: "-0.04em",
          lineHeight: "1.1",
          color: "var(--text)",
          marginBottom: "16px",
          fontFamily: "var(--font-sans)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: "0.25em", flexWrap: "wrap" }}>
          <TextAnimation as="span" text="Your entire" direction="up" letterAnime classname="leading-none" />
          <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>
            <TextAnimation as="span" text=".env" direction="up" letterAnime classname="leading-none" />
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextAnimation as="span" text="one key." direction="up" letterAnime classname="leading-none" />
        </div>
      </h1>

      {/* sub */}
      <p
        className="animate-fade-up delay-3"
        style={{
          maxWidth: "480px",
          fontSize: "17px",
          lineHeight: "1.7",
          color: "var(--text-secondary)",
          marginBottom: "40px",
          fontFamily: "var(--font-sans)",
        }}
      >
        Push your .env once, deploy with a single KEYDROP_KEY. Use keydrop run for builds and init() for runtime — one key, deploy anywhere.
      </p>

      {/* before/after */}
      <div
        className="animate-fade-up delay-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "12px",
          width: "100%",
          maxWidth: "640px",
          marginBottom: "32px",
          textAlign: "left",
        }}
      >
        {/* before */}
        <div style={{ borderRadius: "16px", background: "var(--bg-card)", border: "1px solid var(--border)", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.02)" }}>
            <div style={{ display: "flex", gap: "6px", flex: 1 }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F56" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFBD2E" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27C93F" }} />
            </div>
            <p style={{ fontSize: "10px", fontWeight: "500", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "var(--font-sans)", margin: 0 }}>Before</p>
            <div style={{ flex: 1 }} />
          </div>
          <div style={{ padding: "20px" }}>
            <pre style={{ fontSize: "12px", lineHeight: "1.8", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", margin: 0 }}>
              {`DATABASE_URL=...\nJWT_SECRET=...\nOPENAI_API_KEY=...\nSTRIPE_SECRET_KEY=...`}
            </pre>
          </div>
        </div>

        {/* after */}
        <div style={{ borderRadius: "16px", background: "var(--bg-card)", border: "1px solid var(--accent)", boxShadow: "0 0 40px rgba(34,211,165,0.08)", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid rgba(34,211,165,0.2)", background: "rgba(34,211,165,0.04)" }}>
            <div style={{ display: "flex", gap: "6px", flex: 1 }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F56", opacity: 0.8 }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFBD2E", opacity: 0.8 }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27C93F", opacity: 0.8 }} />
            </div>
            <p style={{ fontSize: "10px", fontWeight: "500", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", fontFamily: "var(--font-sans)", margin: 0, whiteSpace: "nowrap" }}>After</p>
            <div style={{ flex: 1 }} />
          </div>
          <div style={{ padding: "20px" }}>
            <pre style={{ fontSize: "12px", lineHeight: "1.8", fontFamily: "var(--font-mono)", margin: 0, paddingBottom: "14px" }}>
              <span style={{ color: "var(--text-muted)" }}>KEYDROP_KEY=</span>
              <span style={{ color: "var(--accent)" }} className="cursor-blink">
                <RandomizedTextEffect text="proj_x82js8sh" />
              </span>
            </pre>
            <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: 0, fontFamily: "var(--font-sans)", borderTop: "1px dashed rgba(255,255,255,0.1)", paddingTop: "14px" }}>
              Deploy this anywhere. Your app works normally.
            </p>
          </div>
        </div>
      </div>

      {/* ctas */}
      <div className="animate-fade-up delay-5" style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
        <ButtonCreative label="How it works" href="#how-it-works" />
        <ButtonCreative label="Read the docs" href="/docs" />
        <a
          href="https://github.com/devansh-jagtap/keydrop"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "12px 28px",
            borderRadius: "9999px",
            fontSize: "14px",
            fontWeight: "500",
            border: "1px solid var(--border-strong)",
            color: "var(--text-secondary)",
            textDecoration: "none",
            fontFamily: "var(--font-sans)",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
        >
          GitHub ↗
        </a>
      </div>
    </section>
  );
}
