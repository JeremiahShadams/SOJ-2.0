"use client";

import { useEffect, useState, useRef } from "react";
import { SITE } from "@/lib/site";

type PaletteItem = {
  id: string;
  category: "Navigation" | "Action" | "Links";
  label: string;
  sub?: string;
  action: () => void;
};

export default function CommandPalette({
  isOpen,
  onClose,
  onToggleSound,
  soundEnabled,
  onToggleAfterHours,
  afterHoursEnabled,
  onOpenProof,
  onSound,
}: {
  isOpen: boolean;
  onClose: () => void;
  onToggleSound: () => void;
  soundEnabled: boolean;
  onToggleAfterHours: () => void;
  afterHoursEnabled: boolean;
  onOpenProof: () => void;
  onSound?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const items: PaletteItem[] = [
    {
      id: "nav-work",
      category: "Navigation",
      label: "Jump to Selected Work (Side A)",
      sub: "Tecvision, MIST, Emperor, CoreCredit",
      action: () => {
        window.location.hash = "#work";
        onClose();
      },
    },
    {
      id: "nav-lab",
      category: "Navigation",
      label: "Jump to The Lab (Side A)",
      sub: "Fresco, Citer, ContractGuard",
      action: () => {
        window.location.hash = "#lab";
        onClose();
      },
    },
    {
      id: "nav-resume",
      category: "Navigation",
      label: "Jump to Interactive Resume (Side A)",
      sub: "Career timeline & skills matrix",
      action: () => {
        window.location.hash = "#resume";
        onClose();
      },
    },
    {
      id: "nav-now",
      category: "Navigation",
      label: "Jump to Now (Side B)",
      sub: "Editorial monologue & current focus",
      action: () => {
        window.location.hash = "#now";
        onClose();
      },
    },
    {
      id: "nav-booth",
      category: "Navigation",
      label: "Jump to Booth (Side B)",
      sub: "DJ mixes & drum and bass waveform",
      action: () => {
        window.location.hash = "#booth";
        onClose();
      },
    },
    {
      id: "nav-director",
      category: "Navigation",
      label: "Jump to Director's Chair (Side B)",
      sub: "3 storyboards & sequencing notes",
      action: () => {
        window.location.hash = "#directors-chair";
        onClose();
      },
    },
    {
      id: "nav-hidden",
      category: "Navigation",
      label: "Jump to Hidden Track (The Payoff)",
      sub: "Runout groove & highlight reel",
      action: () => {
        window.location.hash = "#hidden-track";
        onClose();
      },
    },
    {
      id: "act-proof",
      category: "Action",
      label: "Open Recruiter 60-Sec Proof Brief",
      sub: "Instant 4-metric executive summary",
      action: () => {
        onClose();
        onOpenProof();
      },
    },
    {
      id: "act-resume",
      category: "Action",
      label: "Download Official Resume (PDF)",
      sub: "/resume.pdf",
      action: () => {
        window.open(SITE.resume, "_blank");
        onClose();
      },
    },
    {
      id: "act-email",
      category: "Action",
      label: "Copy Email Address",
      sub: SITE.email,
      action: () => {
        navigator.clipboard.writeText(SITE.email);
        onSound?.();
        onClose();
      },
    },
    {
      id: "act-afterhours",
      category: "Action",
      label: afterHoursEnabled ? "Disable After Hours Mode" : "Toggle After Hours Mode",
      sub: "Club amber lighting & audio depth",
      action: () => {
        onToggleAfterHours();
        onSound?.();
        onClose();
      },
    },
    {
      id: "act-sound",
      category: "Action",
      label: soundEnabled ? "Mute Procedural Audio" : "Enable Procedural Audio",
      sub: "Synthesizer thunks, clicks & drops",
      action: () => {
        onToggleSound();
        onSound?.();
        onClose();
      },
    },
    {
      id: "link-github",
      category: "Links",
      label: "Open GitHub Profile",
      sub: "github.com/oluwatosin123456789",
      action: () => {
        window.open(SITE.github, "_blank");
        onClose();
      },
    },
    {
      id: "link-linkedin",
      category: "Links",
      label: "Open LinkedIn Profile",
      sub: "linkedin.com/in/jeremiah-shadamoro-547224235",
      action: () => {
        window.open(SITE.linkedin, "_blank");
        onClose();
      },
    },
    {
      id: "link-x",
      category: "Links",
      label: "Open X / Twitter Profile",
      sub: "@jerry_fire17",
      action: () => {
        window.open(SITE.x, "_blank");
        onClose();
      },
    },
  ];

  const filtered = items.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      (item.sub && item.sub.toLowerCase().includes(query.toLowerCase())),
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
        onSound?.();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
        onSound?.();
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
          onSound?.();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, filtered, selectedIndex, onClose, onSound]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "clamp(60px, 12vh, 120px)",
        background: "rgba(9, 9, 11, 0.8)",
        backdropFilter: "blur(8px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "min(560px, 92vw)",
          background: "var(--bg-surface)",
          border: "1px solid var(--border-medium)",
          borderRadius: "var(--radius-md)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8), 0 0 25px rgba(255, 229, 0, 0.12)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "16px 20px",
            borderBottom: "1px solid var(--border-subtle)",
            gap: "12px",
          }}
        >
          <span className="font-mono" style={{ color: "var(--yellow)", fontWeight: 700 }}>
            ⌘
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands, work, skills, or links... (ESC to close)"
            aria-label="Command search"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--text-primary)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
            }}
          />
          <kbd
            className="font-mono"
            style={{
              fontSize: "0.6875rem",
              padding: "2px 6px",
              background: "var(--bg-surface-elevated)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "3px",
              color: "var(--text-tertiary)",
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div
          style={{
            maxHeight: "360px",
            overflowY: "auto",
            padding: "8px",
          }}
        >
          {filtered.length === 0 ? (
            <div
              className="font-mono"
              style={{
                padding: "24px",
                textAlign: "center",
                color: "var(--text-tertiary)",
                fontSize: "0.8125rem",
              }}
            >
              No matching track or command found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onSound?.();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-sm)",
                    background: isSelected ? "var(--bg-surface-hover)" : "transparent",
                    borderLeft: isSelected ? "3px solid var(--yellow)" : "3px solid transparent",
                    cursor: "pointer",
                    transition: "background var(--transition-fast)",
                  }}
                >
                  <div>
                    <div
                      className="font-body"
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: isSelected ? "#fff" : "var(--text-primary)",
                      }}
                    >
                      {item.label}
                    </div>
                    {item.sub && (
                      <div
                        className="font-mono"
                        style={{
                          fontSize: "0.75rem",
                          color: isSelected ? "var(--yellow)" : "var(--text-secondary)",
                          marginTop: "2px",
                        }}
                      >
                        {item.sub}
                      </div>
                    )}
                  </div>
                  <span
                    className="badge-tech"
                    style={{
                      fontSize: "0.625rem",
                      borderColor: isSelected ? "var(--yellow-border)" : "var(--border-subtle)",
                    }}
                  >
                    {item.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div
          style={{
            padding: "10px 16px",
            background: "var(--bg-surface-elevated)",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.6875rem",
            color: "var(--text-tertiary)",
            fontFamily: "var(--font-mono)",
          }}
        >
          <span>Navigate with ↑↓ · Select with Enter</span>
          <span>Jeremiah Shadamoro · Side A / Side B</span>
        </div>
      </div>
    </div>
  );
}
