"use client";

import { useState } from "react";

// In-world image slot. Looks for /shots/<id>.png (drop real screenshots in
// public/shots/ to fill them); until then it renders a styled
// "awaiting cargo photo" placeholder that fits the freight aesthetic.
export default function ImageSlot({
  id,
  alt,
  label,
}: {
  id: string;
  alt: string;
  label: string;
}) {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return (
      <div
        role="img"
        aria-label={`${alt} (placeholder — awaiting photo)`}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          background:
            "repeating-linear-gradient(45deg,#E7E3D8 0 18px,#EDEAE3 18px 36px)",
          border: "2px dashed var(--tape)",
          padding: 16,
          textAlign: "center",
        }}
      >
        <svg width="46" height="46" viewBox="0 0 46 46" aria-hidden="true">
          <rect
            x="4"
            y="10"
            width="38"
            height="28"
            fill="none"
            stroke="#6E6A5E"
            strokeWidth="2.5"
          />
          <circle cx="16" cy="20" r="3.5" fill="none" stroke="#6E6A5E" strokeWidth="2" />
          <path d="M8 34 L20 24 L28 31 L34 26 L40 31" fill="none" stroke="#6E6A5E" strokeWidth="2.5" />
        </svg>
        <div
          className="mono"
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: ".14em",
            color: "var(--muted)",
          }}
        >
          AWAITING CARGO PHOTO
        </div>
        <div
          className="mono"
          style={{ fontSize: 9, letterSpacing: ".08em", color: "var(--tape)" }}
        >
          {label} · DROP /public/shots/{id}.png
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/shots/${id}.png`}
      alt={alt}
      onError={() => setMissing(true)}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  );
}
