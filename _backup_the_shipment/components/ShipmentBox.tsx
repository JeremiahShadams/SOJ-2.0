import { SITE } from "@/lib/site";
import type { Stamp } from "@/hooks/useShipmentEngine";

type ShipmentBoxProps = {
  boxRef: React.RefObject<HTMLDivElement | null>;
  boxInnerRef: React.RefObject<HTMLDivElement | null>;
  shadowRef: React.RefObject<HTMLDivElement | null>;
  boxVisible: boolean;
  stamps: Stamp[];
};

export default function ShipmentBox({
  boxRef,
  boxInnerRef,
  shadowRef,
  boxVisible,
  stamps,
}: ShipmentBoxProps) {
  return (
    <div
      ref={boxRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 6,
        width: 140,
        pointerEvents: "none",
        willChange: "transform",
        transform: "translate(-600px,-600px)",
        opacity: boxVisible ? 1 : 0,
      }}
    >
      <div ref={boxInnerRef} style={{ position: "relative" }}>
        <div
          ref={shadowRef}
          style={{
            position: "absolute",
            bottom: -9,
            left: 10,
            width: 120,
            height: 13,
            background: "rgba(26,26,26,.18)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            height: 22,
            background: "var(--kraft-top)",
            border: "2px solid var(--ink)",
            borderBottom: "none",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 28,
              transform: "translateX(-50%)",
              background: "#B99B67",
              borderLeft: "2px solid #A98B5B",
              borderRight: "2px solid #A98B5B",
            }}
          />
        </div>
        <div
          style={{
            height: 96,
            background: "var(--kraft)",
            border: "2px solid var(--ink)",
            position: "relative",
            overflow: "visible",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 28,
              transform: "translateX(-50%)",
              background: "#BC9E6A",
              opacity: 0.7,
            }}
          />
          <div
            className="mono"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: ".22em",
              color: "var(--ink)",
              opacity: 0.85,
              textTransform: "uppercase",
            }}
          >
            {SITE.boxLabel}
          </div>
          <div
            style={{
              position: "absolute",
              left: 6,
              bottom: 6,
              width: 46,
              height: 20,
              background: "var(--paper)",
              border: "1px solid var(--ink)",
              padding: "3px 4px",
            }}
          >
            <div
              style={{
                height: "100%",
                background:
                  "repeating-linear-gradient(90deg,#1A1A1A 0 2px,transparent 2px 5px)",
              }}
            />
          </div>
          {stamps.map((st) => (
            <div
              key={st.key}
              style={{
                position: "absolute",
                left: st.left,
                top: st.top,
                transform: `rotate(${st.rot}deg)`,
                zIndex: 3,
              }}
            >
              <div
                className="stamp-round"
                style={{
                  width: 54,
                  height: 54,
                  border: `2.5px solid ${st.color}`,
                  color: st.color,
                  fontSize: 7.5,
                  letterSpacing: ".03em",
                  lineHeight: 1.3,
                  padding: 5,
                  background: "rgba(255,253,248,.66)",
                  boxShadow: `inset 0 0 0 1.5px rgba(255,253,248,.9), inset 0 0 0 3px ${st.color}`,
                }}
              >
                {st.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
