import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AiServiceCrmPageContent } from "@/components/AiServiceCrmPageContent";
import { getDemoOverview } from "@/lib/demo-backoffice";
import { getProjectPageCopy, isLocale, locales, type Locale } from "@/lib/i18n";

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

  const copy = getProjectPageCopy(locale);

  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    alternates: {
      canonical: `/${locale}/projects/ai-service-crm`,
      languages: {
        en: "/en/projects/ai-service-crm",
        th: "/th/projects/ai-service-crm",
        zh: "/zh/projects/ai-service-crm",
      },
    },
  };
}

export default async function LocalizedAiServiceCrmPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const overview = await getDemoOverview();

  return <AiServiceCrmPageContent locale={locale as Locale} overview={overview} />;
}
