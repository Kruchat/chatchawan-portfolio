import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutPageContent } from "@/components/AboutPageContent";
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
    title: `${site.content.about.title} | Chatchawan T.`,
    description: site.content.about.body,
    alternates: {
      canonical: locale === "en" ? "/about" : `/${locale}/about`,
      languages: {
        en: "/about",
        th: "/th/about",
        zh: "/zh/about",
      },
    },
  };
}

export default async function LocalizedAboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const site = await getPublicSiteData(locale as Locale);

  return <AboutPageContent locale={locale as Locale} site={site} />;
}
