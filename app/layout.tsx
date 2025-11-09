import type { Metadata } from "next";
import "./globals.css";

const metaTitle = "Cortex Courier | Email & Social Media Agent";
const metaDescription = "Generate polished emails and social posts with an AI-inspired agent that understands tone, audience, and goals.";

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    url: "https://agentic-f2592e07.vercel.app",
    siteName: "Cortex Courier",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: metaTitle,
    description: metaDescription
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
