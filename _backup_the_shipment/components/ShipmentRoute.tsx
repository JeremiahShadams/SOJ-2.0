type ShipmentRouteProps = {
  routeSvgRef: React.RefObject<SVGSVGElement | null>;
  pathRef: React.RefObject<SVGPathElement | null>;
  beltRef: React.RefObject<SVGPathElement | null>;
  rollersRef: React.RefObject<SVGGElement | null>;
};

export default function ShipmentRoute({
  routeSvgRef,
  pathRef,
  beltRef,
  rollersRef,
}: ShipmentRouteProps) {
  return (
    <svg
      ref={routeSvgRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      <g ref={rollersRef} />
      <path ref={pathRef} fill="none" stroke="#1A1A1A" strokeWidth={3} />
      <path
        ref={beltRef}
        fill="none"
        stroke="#EDEAE3"
        strokeWidth={3}
        strokeDasharray="7 26"
      />
    </svg>
  );
}
