import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPageContent } from "@/components/ServiceDetailPageContent";
import { getPublicSiteData, getServicePackage } from "@/lib/cms";
import { isLocale, type Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const service = await getServicePackage(locale, slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.title} | Chatchawan T.`,
    description: service.summary,
    alternates: {
      canonical: locale === "en" ? `/services/${slug}` : `/${locale}/services/${slug}`,
      languages: {
        en: `/services/${slug}`,
        th: `/th/services/${slug}`,
        zh: `/zh/services/${slug}`,
      },
    },
  };
}

export default async function LocalizedServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const [site, service] = await Promise.all([
    getPublicSiteData(locale as Locale),
    getServicePackage(locale as Locale, slug),
  ]);

  if (!service) {
    notFound();
  }

  return <ServiceDetailPageContent locale={locale as Locale} service={service} site={site} />;
}
