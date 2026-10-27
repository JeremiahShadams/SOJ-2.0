"use client";

import { useMemo } from "react";
import { code128Svg } from "@/lib/barcode";

// Scannable Code 128 barcode. Point a phone camera at the screen and it
// resolves the encoded URL / mailto.
export default function Barcode({ value }: { value: string }) {
  const svg = useMemo(() => code128Svg(value), [value]);
  return (
    <div
      style={{ width: "100%", height: "100%" }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
