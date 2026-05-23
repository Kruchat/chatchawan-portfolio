import type { Metadata } from "next";
import { AboutPageContent } from "@/components/AboutPageContent";
import { getPublicSiteData } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Chatchawan T. | Online Systems Developer",
  description: "Personal profile for Chatchawan T., a Next.js, Supabase, AI automation, and admin dashboard developer.",
};

export default async function AboutPage() {
  const site = await getPublicSiteData("en");

  return <AboutPageContent locale="en" site={site} />;
}
