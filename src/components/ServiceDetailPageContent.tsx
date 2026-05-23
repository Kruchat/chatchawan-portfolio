import { ArrowLeft, CheckCircle2, Clock, PackageCheck } from "lucide-react";
import Link from "next/link";
import { HiringRequestForm } from "@/components/HiringRequestForm";
import { SiteHeader } from "@/components/SiteHeader";
import type { PublicSiteData, ServicePackage } from "@/lib/cms";
import { localizedPath, type Locale } from "@/lib/i18n";

const labels = {
  en: {
    features: "Features",
    deliverables: "Deliverables",
  },
  th: {
    features: "ฟีเจอร์",
    deliverables: "สิ่งที่จะส่งมอบ",
  },
  zh: {
    features: "功能",
    deliverables: "交付内容",
  },
};

export function ServiceDetailPageContent({
  locale,
  service,
  site,
}: {
  locale: Locale;
  service: ServicePackage;
  site: PublicSiteData;
}) {
  const { content, services } = site;
  const copy = labels[locale];

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#17130d]">
      <SiteHeader locale={locale} content={content} currentPath={`/services/${service.slug}`} />
      <section className="border-b border-[#17130d]/10">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
          <Link className="inline-flex items-center gap-2 text-sm font-semibold text-[#6d6255]" href={localizedPath(locale, "/services")}>
            <ArrowLeft size={16} />
            {content.nav.services}
          </Link>
          <div className="grid gap-8 py-12 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <p className="eyebrow">{content.services.eyebrow}</p>
              <h1 className="mt-4 max-w-5xl text-5xl font-semibold leading-tight sm:text-6xl">
                {service.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5a5044]">{service.description}</p>
              <a className="primary-action mt-8" href="#order">
                <PackageCheck size={18} />
                {content.nav.hire}
              </a>
            </div>
            <div className="rounded-md border border-[#17130d]/10 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-md bg-[#17130d] text-[#f7f5ef]">
                  <Clock size={21} />
                </span>
                <div>
                  <p className="font-mono text-sm font-semibold text-[#6d6255]">{service.timeline}</p>
                  <p className="text-2xl font-semibold">{service.priceFrom}</p>
                </div>
              </div>
              <p className="mt-4 leading-7 text-[#5a5044]">{service.summary}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-md border border-[#17130d]/10 bg-white p-5 shadow-sm">
            <p className="eyebrow">{copy.features}</p>
            <div className="mt-5 grid gap-3">
              {service.features.map((feature) => (
                <p className="flex items-start gap-3 rounded-md bg-[#f7f5ef] p-3 leading-7 text-[#5a5044]" key={feature}>
                  <CheckCircle2 className="mt-1 shrink-0 text-emerald-700" size={18} />
                  {feature}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-md border border-[#17130d]/10 bg-white p-5 shadow-sm">
            <p className="eyebrow">{copy.deliverables}</p>
            <div className="mt-5 grid gap-3">
              {service.deliverables.map((deliverable) => (
                <p className="flex items-start gap-3 rounded-md bg-[#f7f5ef] p-3 leading-7 text-[#5a5044]" key={deliverable}>
                  <CheckCircle2 className="mt-1 shrink-0 text-emerald-700" size={18} />
                  {deliverable}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="order" className="px-5 pb-10 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-md border border-[#17130d]/10 bg-white p-6 shadow-sm lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">{content.contact.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight">{content.contact.title}</h2>
            <p className="mt-4 leading-7 text-[#5a5044]">{content.contact.body}</p>
          </div>
          <HiringRequestForm locale={locale} services={services} selectedServiceSlug={service.slug} />
        </div>
      </section>
    </main>
  );
}
