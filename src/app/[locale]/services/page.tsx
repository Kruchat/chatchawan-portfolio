import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicesPageContent } from "@/components/ServicesPageContent";
import { getPublicSiteData } from "@/lib/cms";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const site = await getPublicSiteData(locale);

  return {
    title: `${site.content.services.title} | Chatchawan T.`,
    description: site.content.services.body,
    alternates: {
      canonical: locale === "en" ? "/services" : `/${locale}/services`,
      languages: {
        en: "/services",
        th: "/th/services",
        zh: "/zh/services",
      },
    },
  };
}

export default async function LocalizedServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const site = await getPublicSiteData(locale as Locale);

  return <ServicesPageContent locale={locale as Locale} site={site} />;
}
