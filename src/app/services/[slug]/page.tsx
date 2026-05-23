import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPageContent } from "@/components/ServiceDetailPageContent";
import { getPublicSiteData, getServicePackage } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServicePackage("en", slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.title} | Chatchawan T.`,
    description: service.summary,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [site, service] = await Promise.all([
    getPublicSiteData("en"),
    getServicePackage("en", slug),
  ]);

  if (!service) {
    notFound();
  }

  return <ServiceDetailPageContent locale="en" service={service} site={site} />;
}
