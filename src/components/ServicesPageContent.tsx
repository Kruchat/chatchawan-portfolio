import { ArrowUpRight, PackageCheck } from "lucide-react";
import Link from "next/link";
import { HiringRequestForm } from "@/components/HiringRequestForm";
import { SiteHeader } from "@/components/SiteHeader";
import type { PublicSiteData } from "@/lib/cms";
import { localizedPath, type Locale } from "@/lib/i18n";

export function ServicesPageContent({ locale, site }: { locale: Locale; site: PublicSiteData }) {
  const { content, services } = site;

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#17130d]">
      <SiteHeader locale={locale} content={content} currentPath="/services" />
      <section className="border-b border-[#17130d]/10">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
          <p className="eyebrow">{content.services.eyebrow}</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-semibold leading-tight sm:text-6xl">
            {content.services.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5a5044]">{content.services.body}</p>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-4 lg:grid-cols-3">
          {services.map((service) => (
            <article className="project-card" key={service.slug}>
              <PackageCheck className="text-[#0f766e]" size={26} />
              <p className="mt-6 font-mono text-xs font-bold uppercase text-[#7a6c5d]">
                {service.priceFrom} / {service.timeline}
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-8">{service.title}</h2>
              <p className="mt-4 min-h-24 leading-7 text-[#5a5044]">{service.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {service.features.slice(0, 4).map((feature) => (
                  <span className="tech-chip" key={feature}>{feature}</span>
                ))}
              </div>
              <Link className="secondary-action mt-6" href={localizedPath(locale, `/services/${service.slug}`)}>
                <ArrowUpRight size={18} />
                {service.title}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="hire" className="px-5 pb-10 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-md border border-[#17130d]/10 bg-white p-6 shadow-sm lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">{content.contact.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight">{content.contact.title}</h2>
            <p className="mt-4 leading-7 text-[#5a5044]">{content.contact.body}</p>
          </div>
          <HiringRequestForm locale={locale} services={services} />
        </div>
      </section>
    </main>
  );
}
