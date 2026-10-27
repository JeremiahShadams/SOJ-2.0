"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

export default function Footer({ onSound }: { onSound?: () => void }) {
  const [watTime, setWatTime] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Lagos is UTC+1 (WAT)
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const wat = new Date(utc + 3600000);
      const hours = String(wat.getHours()).padStart(2, "0");
      const mins = String(wat.getMinutes()).padStart(2, "0");
      const secs = String(wat.getSeconds()).padStart(2, "0");
      setWatTime(`${hours}:${mins}:${secs} WAT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copy = (val: string, label: string) => {
    navigator.clipboard.writeText(val);
    setCopied(label);
    onSound?.();
    setTimeout(() => setCopied(null), 2000);
  };

  const returnToTop = () => {
    onSound?.();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      role="contentinfo"
      aria-label="Site Footer & Direct Contact"
      style={{
        position: "relative",
        background: "var(--bg-root)",
        borderTop: "1px solid var(--border-medium)",
        padding: "clamp(60px, 10vh, 90px) 0 40px",
      }}
    >
      <div className="site-container">
        {/* Main Footer Contact Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "40px",
            marginBottom: "60px",
          }}
        >
          {/* Col 1: Identity & Availability */}
          <div>
            <div className="badge-live" style={{ marginBottom: "16px" }}>
              AVAILABLE FOR HIRE · REMOTE US/EU
            </div>
            <h3
              className="font-display"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 700,
                color: "#fff",
                margin: "0 0 12px 0",
              }}
            >
              Let&apos;s build something timeless.
            </h3>
            <p
              className="font-body"
              style={{
                fontSize: "0.9375rem",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                margin: 0,
                maxWidth: "380px",
              }}
            >
              Whether you need a Founding Engineer for your seed-stage startup or a Full-Stack AI Engineer for your core product line, my inbox is open.
            </p>
          </div>

          {/* Col 2: Direct Contact Coordinates */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
              // DIRECT COORDINATES
            </div>

            <button
              onClick={() => copy(SITE.email, "email")}
              className="card-editorial"
              style={{
                padding: "14px 18px",
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div className="font-mono" style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>
                  EMAIL
                </div>
                <div className="font-mono" style={{ fontSize: "0.9375rem", color: "var(--yellow)", fontWeight: 700 }}>
                  {SITE.email}
                </div>
              </div>
              <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                {copied === "email" ? "COPIED ✓" : "CLICK TO COPY"}
              </span>
            </button>

            <button
              onClick={() => copy(SITE.phone, "phone")}
              className="card-editorial"
              style={{
                padding: "14px 18px",
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div className="font-mono" style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>
                  PHONE / WHATSAPP
                </div>
                <div className="font-mono" style={{ fontSize: "0.9375rem", color: "#fff", fontWeight: 700 }}>
                  {SITE.phone}
                </div>
              </div>
              <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                {copied === "phone" ? "COPIED ✓" : "CLICK TO COPY"}
              </span>
            </button>
          </div>

          {/* Col 3: Public Channels */}
          <div>
            <div className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginBottom: "14px" }}>
              // PUBLIC CHANNELS
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onSound?.()}
                className="btn-outline"
                style={{ justifyContent: "space-between" }}
              >
                <span>GITHUB</span>
                <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                  @oluwatosin123456789 ↗
                </span>
              </a>

              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onSound?.()}
                className="btn-outline"
                style={{ justifyContent: "space-between" }}
              >
                <span>LINKEDIN</span>
                <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                  jeremiah-shadamoro ↗
                </span>
              </a>

              <a
                href={SITE.x}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onSound?.()}
                className="btn-outline"
                style={{ justifyContent: "space-between" }}
              >
                <span>X / TWITTER</span>
                <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                  @jerry_fire17 ↗
                </span>
              </a>

              <a
                href={SITE.medium}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onSound?.()}
                className="btn-outline"
                style={{ justifyContent: "space-between" }}
              >
                <span>TECHNICAL WRITING</span>
                <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                  @jeremiahshadamoro ↗
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Strip */}
        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "14px",
            fontSize: "0.75rem",
            color: "var(--text-tertiary)",
            fontFamily: "var(--font-mono)",
          }}
        >
          <div>
            © {new Date().getFullYear()} JEREMIAH SHADAMORO · ALL RIGHTS RESERVED.
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--signal-green)",
                display: "inline-block",
              }}
            />
            <span>LAGOS, NG · {watTime || "--:--:-- WAT"}</span>
          </div>

          <button
            onClick={returnToTop}
            className="btn-ghost"
            style={{ fontSize: "0.75rem", color: "var(--yellow)" }}
          >
            RETURN NEEDLE TO TRACK 01 ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
