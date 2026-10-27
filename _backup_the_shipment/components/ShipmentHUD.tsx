import { SITE } from "@/lib/site";

type ShipmentHUDProps = {
  hudStatusRef: React.RefObject<HTMLSpanElement | null>;
  hudPctRef: React.RefObject<HTMLSpanElement | null>;
  hudNextRef: React.RefObject<HTMLSpanElement | null>;
  hudBarRef: React.RefObject<HTMLDivElement | null>;
};

export default function ShipmentHUD({
  hudStatusRef,
  hudPctRef,
  hudNextRef,
  hudBarRef,
}: ShipmentHUDProps) {
  return (
    <div
      className="mono hud-card"
      aria-hidden="true"
      style={{
        position: "fixed",
        left: 18,
        bottom: 18,
        zIndex: 320,
        background: "var(--paper)",
        border: "2px solid var(--ink)",
        boxShadow: "5px 5px 0 rgba(26,26,26,.9)",
        padding: "12px 16px",
        fontSize: 11,
        letterSpacing: ".06em",
        lineHeight: 1.8,
        minWidth: 250,
      }}
    >
      <div
        style={{
          fontWeight: 700,
          borderBottom: "1px solid var(--ink)",
          paddingBottom: 4,
          marginBottom: 4,
        }}
      >
        TRACKING № {SITE.trackingNo}
      </div>
      <div>
        STATUS:{" "}
        <span ref={hudStatusRef} style={{ color: "var(--cargo-blue)", fontWeight: 700 }}>
          ORDER PLACED
        </span>{" "}
        ▸ <span ref={hudPctRef}>0%</span>
      </div>
      <div>
        NEXT STOP: <span ref={hudNextRef}>STATION 00 - THE LABEL</span>
      </div>
      <div
        style={{
          height: 5,
          background: "#E4DFD3",
          marginTop: 6,
          border: "1px solid var(--ink)",
        }}
      >
        <div
          ref={hudBarRef}
          style={{ height: "100%", width: "0%", background: "var(--cargo-blue)" }}
        />
      </div>
    </div>
  );
}
