"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

export default function Shell({
  activeSide,
  onToggleSide,
  onOpenProof,
  onOpenPalette,
  soundEnabled,
  onToggleSound,
  onSound,
}: {
  activeSide: "A" | "B";
  onToggleSide: () => void;
  onOpenProof: () => void;
  onOpenPalette: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onSound?: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      role="banner"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 150,
        background: scrolled ? "var(--bg-glass)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
        transition: "all var(--transition-smooth)",
      }}
    >
      <div
        className="site-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
          gap: "16px",
        }}
      >
        {/* Left: Moniker & Track Status */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a
            href="#"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              className="font-display"
              style={{
                fontSize: "0.9375rem",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "0.02em",
              }}
            >
              JEREMIAH SHADAMORO
            </span>
            <span
              className="badge-yellow"
              style={{ padding: "2px 6px", fontSize: "0.625rem" }}
            >
              SIDE {activeSide}
            </span>
          </a>
        </div>

        {/* Center: Tracklist Navigation (Desktop) */}
        <nav
          aria-label="Tracklist navigation"
          className="desktop-nav"
          style={{
            display: "none",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {activeSide === "A" ? (
            <>
              <a href="#work" className="btn-ghost" style={{ fontSize: "0.8125rem" }}>
                01 WORK
              </a>
              <a href="#lab" className="btn-ghost" style={{ fontSize: "0.8125rem" }}>
                02 LAB
              </a>
              <a href="#resume" className="btn-ghost" style={{ fontSize: "0.8125rem" }}>
                03 RESUME
              </a>
              <a href="#contact" className="btn-ghost" style={{ fontSize: "0.8125rem" }}>
                04 CONTACT
              </a>
            </>
          ) : (
            <>
              <a href="#now" className="btn-ghost" style={{ fontSize: "0.8125rem" }}>
                B01 NOW
              </a>
              <a href="#booth" className="btn-ghost" style={{ fontSize: "0.8125rem" }}>
                B02 BOOTH
              </a>
              <a href="#directors-chair" className="btn-ghost" style={{ fontSize: "0.8125rem" }}>
                B03 DIRECT
              </a>
              <a href="#hidden-track" className="btn-ghost" style={{ fontSize: "0.8125rem" }}>
                00 HIDDEN
              </a>
            </>
          )}
        </nav>

        {/* Right: Tactical Actions & Record Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Side A / Side B Tactile Needle Drop Switch */}
          <button
            onClick={() => {
              onSound?.();
              onToggleSide();
            }}
            className="btn-outline"
            style={{
              padding: "6px 12px",
              fontSize: "0.75rem",
              borderColor: "var(--yellow-border)",
              background: "rgba(255, 229, 0, 0.06)",
            }}
            title="Flip record to other side"
          >
            <span style={{ color: "var(--yellow)", fontWeight: 800 }}>FLIP:</span>
            <span>SIDE {activeSide === "A" ? "B (STUDIO)" : "A (WORK)"}</span>
          </button>

          {/* Recruiter PROOF brief trigger */}
          <button
            onClick={() => {
              onSound?.();
              onOpenProof();
            }}
            className="btn-yellow"
            style={{ padding: "6px 12px", fontSize: "0.75rem" }}
            title="Recruiter 60-Second Proof Brief"
          >
            PROOF
          </button>

          {/* Command Palette Trigger */}
          <button
            onClick={() => {
              onSound?.();
              onOpenPalette();
            }}
            className="btn-outline"
            style={{ padding: "6px 10px", fontSize: "0.75rem" }}
            aria-label="Open command palette"
            title="Command Palette (Cmd+K)"
          >
            <span className="font-mono">⌘K</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              onSound?.();
            }}
            className="btn-ghost"
            style={{
              padding: "6px 8px",
              fontSize: "0.75rem",
              color: soundEnabled ? "var(--yellow)" : "var(--text-tertiary)",
            }}
            aria-label={soundEnabled ? "Mute audio" : "Enable sound"}
            title={soundEnabled ? "Sound ON (procedural)" : "Sound OFF (muted)"}
          >
            {soundEnabled ? "AUDIO: ON" : "AUDIO: OFF"}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="btn-ghost mobile-menu-toggle"
            aria-label="Toggle mobile menu"
            style={{ padding: "6px 8px", fontSize: "1.1rem" }}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: "var(--bg-surface)",
            borderBottom: "1px solid var(--border-medium)",
            padding: "16px 20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div className="badge-yellow" style={{ alignSelf: "flex-start" }}>
            TRACKLIST // SIDE {activeSide}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", margin: "8px 0" }}>
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-outline"
              style={{ justifyContent: "flex-start" }}
            >
              01 WORK
            </a>
            <a
              href="#lab"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-outline"
              style={{ justifyContent: "flex-start" }}
            >
              02 LAB
            </a>
            <a
              href="#resume"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-outline"
              style={{ justifyContent: "flex-start" }}
            >
              03 RESUME
            </a>
            <a
              href="#now"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-outline"
              style={{ justifyContent: "flex-start" }}
            >
              B01 NOW
            </a>
            <a
              href="#booth"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-outline"
              style={{ justifyContent: "flex-start" }}
            >
              B02 BOOTH
            </a>
            <a
              href="#directors-chair"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-outline"
              style={{ justifyContent: "flex-start" }}
            >
              B03 DIRECT
            </a>
          </div>

          <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProof();
              }}
              className="btn-yellow"
              style={{ flex: 1 }}
            >
              RECRUITER PROOF BRIEF
            </button>
            <a
              href={SITE.resume}
              download
              className="btn-outline"
              style={{ flex: 1 }}
            >
              RESUME PDF ↓
            </a>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
