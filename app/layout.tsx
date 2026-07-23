import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOJ / Native Labs - The Shipment",
  description:
    "Jeremiah “SOJ” Shadamoro - design engineer for AI products, end-to-end. Follow the package through the fulfilment line: Contract Guard, Fresco, PayTrace, Kortex. Shipped from Lagos, available for U.S. remote roles.",
  keywords: [
    "design engineer",
    "AI products",
    "RAG",
    "computer vision",
    "portfolio",
    "Lagos",
    "remote",
  ],
  openGraph: {
    title: "SOJ / Native Labs - The Shipment",
    description:
      "One package. One conveyor line. Every project stamps the box. Sign for delivery at the end.",
    type: "website",
    siteName: "Native Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOJ / Native Labs - The Shipment",
    description:
      "A portfolio you push down the fulfilment line. Scroll to start the conveyor.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
