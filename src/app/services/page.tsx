import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/ServicesPageContent";
import { getPublicSiteData } from "@/lib/cms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services | Chatchawan T.",
  description: "Order service packages for Next.js, Supabase, AI automation, booking workflows, and admin dashboards.",
};

export default async function ServicesPage() {
  const site = await getPublicSiteData("en");

  return <ServicesPageContent locale="en" site={site} />;
}
