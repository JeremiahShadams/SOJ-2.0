"use client";

import { useState, useEffect, useCallback } from "react";
import Shell from "@/components/layout/Shell";
import ManifestoRail from "@/components/manifesto/ManifestoRail";
import ProofDrawer from "@/components/modals/ProofDrawer";
import CommandPalette from "@/components/modals/CommandPalette";
import Hero from "@/components/sections/Hero";
import ProofStrip from "@/components/sections/ProofStrip";
import SelectedWork from "@/components/sections/SelectedWork";
import Lab from "@/components/sections/Lab";
import ResumeSection from "@/components/sections/ResumeSection";
import Now from "@/components/sections/Now";
import Booth from "@/components/sections/Booth";
import DirectorsChair from "@/components/sections/DirectorsChair";
import HiddenTrack from "@/components/sections/HiddenTrack";
import Footer from "@/components/layout/Footer";
import { playSound, SoundKind } from "@/lib/sound";

export default function Home() {
  const [activeSide, setActiveSide] = useState<"A" | "B">("A");
  const [proofOpen, setProofOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [afterHoursEnabled, setAfterHoursEnabled] = useState(false);

  const snd = useCallback(
    (kind: SoundKind = "click") => {
      if (soundEnabled) playSound(kind);
    },
    [soundEnabled],
  );

  // Global Keyboard Shortcuts (Cmd+K, P for Proof, B for Flip Side, M for Mute)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((p) => !p);
        snd("click");
      } else if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        setProofOpen((p) => !p);
        snd("click");
      } else if (e.key === "b" || e.key === "B") {
        e.preventDefault();
        toggleSide();
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        setSoundEnabled((s) => !s);
        playSound("chime");
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [snd]);

  // Toggle Side A / Side B with sound & smooth transition
  const toggleSide = () => {
    snd(activeSide === "A" ? "scratch" : "needleDrop");
    const nextSide = activeSide === "A" ? "B" : "A";
    setActiveSide(nextSide);

    // Smoothly scroll to the corresponding side anchor
    const targetAnchor = nextSide === "B" ? "#now" : "#hero";
    const el = document.querySelector(targetAnchor);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleAfterHours = () => {
    setAfterHoursEnabled((prev) => {
      const next = !prev;
      if (next) {
        document.body.classList.add("after-hours");
      } else {
        document.body.classList.remove("after-hours");
      }
      return next;
    });
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "var(--bg-root)" }}>
      {/* Global Navigation Shell */}
      <Shell
        activeSide={activeSide}
        onToggleSide={toggleSide}
        onOpenProof={() => setProofOpen(true)}
        onOpenPalette={() => setPaletteOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((s) => !s)}
        onSound={() => snd("click")}
      />

      {/* Floating Yellow Manifesto Guardrail */}
      <ManifestoRail onSoundClick={() => snd("click")} />

      {/* Modals & Drawers */}
      <ProofDrawer
        isOpen={proofOpen}
        onClose={() => setProofOpen(false)}
        onSound={() => snd("click")}
      />

      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onToggleSound={() => setSoundEnabled((s) => !s)}
        soundEnabled={soundEnabled}
        onToggleAfterHours={toggleAfterHours}
        afterHoursEnabled={afterHoursEnabled}
        onOpenProof={() => setProofOpen(true)}
        onSound={() => snd("click")}
      />

      {/* Main Track Flow */}
      <main id="main-content">
        {/* Track 01: Hero (Side A Opening) */}
        <Hero
          activeSide={activeSide}
          onFlipSide={toggleSide}
          onOpenProof={() => setProofOpen(true)}
          onSound={() => snd("needleDrop")}
        />

        {/* Track 02: Verified Proof Strip */}
        <ProofStrip onSound={() => snd("click")} />

        {/* Track 03: Selected Work (Master Case Studies) */}
        <SelectedWork onSound={() => snd("click")} />

        {/* Track 04: The Lab (Productized AI & Systems) */}
        <Lab onSound={() => snd("click")} />

        {/* Track 05: Scannable Web Resume */}
        <ResumeSection onSound={() => snd("click")} />

        {/* Track B01: Now Monologue (Side B) */}
        <Now onSound={() => snd("click")} />

        {/* Track B02: The Booth & DJ Room (Side B) */}
        <Booth
          afterHoursEnabled={afterHoursEnabled}
          onToggleAfterHours={toggleAfterHours}
          onSound={() => snd("scratch")}
        />

        {/* Track B03: Director's Chair (Side B) */}
        <DirectorsChair onSound={() => snd("click")} />

        {/* Track 00: The Hidden Track (Runout Groove) */}
        <HiddenTrack onSound={() => snd("needleDrop")} />
      </main>

      {/* Global Footer */}
      <Footer onSound={() => snd("click")} />
    </div>
  );
}
