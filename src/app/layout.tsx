import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chatchawan T. | Online Systems and AI Automation Developer",
  description:
    "Portfolio and online service sales site for Next.js App Router, TypeScript, Supabase, AI automation, dashboards, and admin systems by Chatchawan T.",
  openGraph: {
    title: "Chatchawan T. | Online Systems and AI Automation Developer",
    description:
      "Next.js App Router, TypeScript, Supabase, AI automation, dashboards, service packages, and admin systems portfolio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
