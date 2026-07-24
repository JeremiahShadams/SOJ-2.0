import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOJ / Native Labs - Fullstack AI Engineer",
  description:
    "Jeremiah “SOJ” Shadamoro - fullstack AI engineer. Interface + backend + intelligence. Specializing in RAG, CV, and agentic systems. Based in Lagos, available for U.S. remote roles.",
  keywords: [
    "fullstack AI engineer",
    "AI engineer",
    "RAG",
    "computer vision",
    "agentic AI",
    "portfolio",
    "Lagos",
    "remote",
    "technical writing",
  ],
  openGraph: {
    title: "SOJ / Native Labs - Fullstack AI Engineer",
    description:
      "Fullstack AI engineer bridging interface, backend, and intelligence. View the fulfillment line of AI projects.",
    type: "website",
    siteName: "Native Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOJ / Native Labs - Fullstack AI Engineer",
    description:
      "Fullstack AI engineer bridging interface, backend, and intelligence. View the fulfillment line of AI projects.",
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
