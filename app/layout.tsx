import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.role}`,
  description: SITE.headline + " " + SITE.subheadline,
  keywords: [
    "Jeremiah Shadamoro",
    "SOJ",
    "Software Engineer",
    "Full-Stack Engineer",
    "AI Engineer",
    "FastAPI",
    "Next.js",
    "TypeScript",
    "Python",
    "pgvector",
    "LangGraph",
    "Stripe",
    "Paystack",
    "TensorFlow.js",
    "Lagos",
    "Remote Engineer",
  ],
  authors: [{ name: SITE.name, url: SITE.github }],
  creator: SITE.name,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.headline,
    type: "website",
    siteName: "Jeremiah Shadamoro",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.headline,
    creator: "@jerry_fire17",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    jobTitle: SITE.role,
    email: `mailto:${SITE.email}`,
    telephone: SITE.phone,
    url: "https://shadams.dev",
    sameAs: [SITE.github, SITE.linkedin, SITE.x, SITE.medium],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: SITE.education.institution,
    },
    knowsAbout: [
      "Software Engineering",
      "Full-Stack Development",
      "Artificial Intelligence",
      "Retrieval-Augmented Generation (RAG)",
      "Payment Systems",
      "Computer Vision",
    ],
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body style={{ backgroundColor: "#09090b", color: "#f4f4f5", margin: 0 }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
