import { ArrowLeft, Code2, Database, PlayCircle } from "lucide-react";
import Link from "next/link";
import { AiServiceCrmProject } from "@/components/AiServiceCrmProject";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getProjectPageCopy, localizedPath, type Locale } from "@/lib/i18n";
import type { DemoOverview } from "@/lib/demo-backoffice";

export function AiServiceCrmPageContent({
  locale,
  overview,
}: {
  locale: Locale;
  overview: DemoOverview;
}) {
  const copy = getProjectPageCopy(locale);

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#17130d]">
      <section className="border-b border-[#17130d]/10">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#6d6255]"
              href={localizedPath(locale, "/")}
            >
              <ArrowLeft size={16} />
              {copy.backLabel}
            </Link>
            <LanguageSwitcher currentLocale={locale} currentPath="/projects/ai-service-crm" />
          </div>

          <div className="grid gap-8 py-12 lg:grid-cols-[1fr_0.82fr] lg:items-end">
            <div>
              <p className="eyebrow">{copy.eyebrow}</p>
              <h1 className="mt-4 max-w-5xl text-5xl font-semibold leading-tight sm:text-6xl">
                {copy.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5a5044]">
                {copy.body}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className="primary-action" href="#playground">
                  <PlayCircle size={18} />
                  {copy.tryWorkflow}
                </a>
                <Link className="secondary-action" href="/demo/backoffice">
                  <Database size={18} />
                  {copy.viewBackoffice}
                </Link>
              </div>
            </div>

            <div className="rounded-md border border-[#17130d]/10 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <Code2 className="mt-1 text-[#17130d]" />
                <div>
                  <p className="font-mono text-sm font-semibold text-[#7a6c5d]">
                    {copy.proofEyebrow}
                  </p>
                  <p className="mt-2 text-xl font-semibold leading-7">{copy.proofTitle}</p>
                  <p className="mt-3 leading-7 text-[#5a5044]">{copy.proofBody}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="playground" className="section-shell">
        <AiServiceCrmProject initialOverview={overview} copy={copy.client} />
      </section>
    </main>
  );
}
