import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";

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
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
