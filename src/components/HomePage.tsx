import {
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  Check,
  Code2,
  Database,
  LayoutDashboard,
  MessageSquareText,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { HiringRequestForm } from "@/components/HiringRequestForm";
import { SiteHeader } from "@/components/SiteHeader";
import type { PublicSiteData, ServicePackage } from "@/lib/cms";
import { localizedPath, type Locale } from "@/lib/i18n";

const serviceIcons = [Bot, LayoutDashboard, PackageCheck, Database];

const pageLabels = {
  en: {
    adminProof: "Requests are stored server-side in Supabase and reviewed from the admin backoffice.",
  },
  th: {
    adminProof: "คำขอจ้างงานถูกบันทึกฝั่ง server ใน Supabase และตรวจดูได้จากระบบหลังบ้าน",
  },
  zh: {
    adminProof: "请求会在服务端保存到 Supabase，并可在后台系统中审核。",
  },
};

function serviceHref(locale: Locale, service: ServicePackage) {
  return localizedPath(locale, `/services/${service.slug}`);
}

export function HomePage({ locale, site }: { locale: Locale; site: PublicSiteData }) {
  const { content, settings, services, projects } = site;
  const labels = pageLabels[locale];
  const chatLinks = [
    { label: "LINE", href: settings.lineUrl },
    { label: "WhatsApp", href: settings.whatsappUrl },
    { label: "Messenger", href: settings.messengerUrl },
    { label: "Email", href: settings.email ? `mailto:${settings.email}` : "" },
  ].filter((item) => item.href);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f5ef] text-[#17130d]">
      <SiteHeader locale={locale} content={content} currentPath="/" />

      <section className="relative border-b border-[#17130d]/10">
        <div className="absolute inset-0 pattern-grid opacity-60" />
        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-74px)] max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_0.92fr] lg:px-10">
          <div className="max-w-3xl animate-[fadeUp_0.7s_ease-out_both]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-[#17130d]/15 bg-white/70 px-3 py-2 text-sm font-semibold text-[#17130d]/70 shadow-sm backdrop-blur">
              <Sparkles size={16} />
              {content.home.eyebrow}
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] text-[#17130d] sm:text-6xl lg:text-7xl">
              {content.home.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#4b4236]">
              {content.home.body}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a className="primary-action" href="#hire">
                <BriefcaseBusiness size={18} />
                {content.home.primaryCta}
              </a>
              <Link className="secondary-action" href={localizedPath(locale, "/services")}>
                <PackageCheck size={18} />
                {content.home.secondaryCta}
              </Link>
              <Link className="secondary-action" href={localizedPath(locale, "/about")}>
                <Code2 size={18} />
                {content.nav.about}
              </Link>
            </div>

            <div className="mt-10 grid gap-4 border-y border-[#17130d]/10 py-5 sm:grid-cols-3">
              {content.home.proofPoints.map((item) => (
                <div key={item.label}>
                  <p className="font-mono text-xl font-semibold text-[#17130d]">{item.value}</p>
                  <p className="mt-1 text-sm leading-5 text-[#6d6255]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="visual-board animate-[fadeUp_0.9s_ease-out_0.08s_both]">
            <div className="visual-topbar">
              <span />
              <span />
              <span />
              <p>portfolio-system/admin.tsx</p>
            </div>
            <div className="grid gap-4 p-4">
              <div className="interface-panel bg-[#17130d] text-[#f7f5ef]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow text-[#f6c453]">Order flow</p>
                    <h2 className="mt-2 text-3xl font-semibold">Service package to hiring request</h2>
                  </div>
                  <span className="rounded-md bg-[#2dd4bf] px-3 py-1 font-mono text-xs font-semibold text-[#042f2e]">
                    CMS ready
                  </span>
                </div>
                <div className="mt-7 grid gap-3">
                  {["Published service", "Client order request", "Supabase record", "Admin follow-up"].map((step, index) => (
                    <div className="flex items-center gap-3 rounded-md bg-white/10 p-3" key={step}>
                      <span className="grid h-8 w-8 place-items-center rounded-md bg-[#f6c453] font-mono text-xs font-bold text-[#17130d]">
                        0{index + 1}
                      </span>
                      <span className="font-semibold">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["Services", services.length],
                  ["Projects", projects.length],
                  ["Languages", 3],
                ].map(([label, value]) => (
                  <div className="interface-panel" key={label}>
                    <p className="eyebrow">{label}</p>
                    <p className="mt-2 text-3xl font-semibold">{value}</p>
                  </div>
                ))}
              </div>
              <div className="interface-panel">
                <div className="flex items-start gap-3">
                  <MessageSquareText className="mt-1 text-[#0f766e]" />
                  <p className="leading-7 text-[#5a5044]">
                    {settings.responseNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section-shell">
        <div className="section-heading">
          <p className="eyebrow">{content.services.eyebrow}</p>
          <h2>{content.services.title}</h2>
          <p>{content.services.body}</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = serviceIcons[index] ?? PackageCheck;
            return (
              <article className="project-card" key={service.slug}>
                <Icon className="text-[#0f766e]" size={26} />
                <p className="mt-6 font-mono text-xs font-bold uppercase text-[#7a6c5d]">
                  {service.priceFrom} / {service.timeline}
                </p>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <h3 className="text-2xl font-semibold leading-8">{service.title}</h3>
                  <Link
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[#17130d]/15 text-[#17130d] transition hover:bg-[#17130d] hover:text-[#f7f5ef]"
                    href={serviceHref(locale, service)}
                    aria-label={`Open ${service.title}`}
                  >
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
                <p className="mt-4 min-h-24 leading-7 text-[#5a5044]">{service.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.features.slice(0, 4).map((feature) => (
                    <span className="tech-chip" key={feature}>{feature}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="projects" className="border-y border-[#17130d]/10 bg-[#17130d] text-[#f7f5ef]">
        <div className="section-shell">
          <div className="section-heading text-[#f7f5ef]">
            <p className="eyebrow text-[#f6c453]">{content.projects.eyebrow}</p>
            <h2>{content.projects.title}</h2>
            <p className="text-[#d6ccbd]">{content.projects.body}</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {projects.map((project) => (
              <article className="service-card" key={`${project.locale}-${project.slug}`}>
                <Database size={24} className="text-[#f6c453]" />
                <div>
                  <p className="font-mono text-xs font-bold uppercase text-[#d6ccbd]">{project.type}</p>
                  <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
                  <p className="mt-3 leading-7 text-[#d6ccbd]">{project.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span className="rounded-md bg-white/10 px-2.5 py-1 font-mono text-xs font-semibold" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#f6c453]" href={localizedPath(locale, project.href)}>
                    Open project <ArrowUpRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="hire" className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="eyebrow">{content.contact.eyebrow}</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight">{content.contact.title}</h2>
            <p className="mt-4 leading-7 text-[#5a5044]">{content.contact.body}</p>
            <div className="mt-6 rounded-md border border-[#17130d]/10 bg-white p-5 shadow-sm">
              <p className="eyebrow">{content.contact.chatTitle}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {chatLinks.length ? (
                  chatLinks.map((item) => (
                    <a className="secondary-action min-h-10 px-3 py-2 text-sm" href={item.href} key={item.label}>
                      {item.label}
                    </a>
                  ))
                ) : (
                  <p className="text-sm leading-6 text-[#6d6255]">{settings.responseNote}</p>
                )}
              </div>
            </div>
            <div className="mt-4 rounded-md border border-[#17130d]/10 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 text-emerald-700" />
                <p className="leading-7 text-[#5a5044]">
                  {labels.adminProof}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-md border border-[#17130d]/10 bg-white p-5 shadow-sm">
            <p className="eyebrow">{content.contact.formTitle}</p>
            <h3 className="mt-2 text-2xl font-semibold">{content.nav.hire}</h3>
            <div className="mt-5">
              <HiringRequestForm locale={locale} services={services} />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-5 pb-10 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-md border border-[#17130d]/10 bg-white p-6 shadow-sm lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">{content.contact.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight">{content.contact.formTitle}</h2>
            <p className="mt-4 leading-7 text-[#5a5044]">{settings.responseNote}</p>
          </div>
          <ContactForm locale={locale} />
        </div>
      </section>

      <footer className="border-t border-[#17130d]/10 px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[#6d6255] sm:flex-row sm:items-center sm:justify-between">
          <p>{content.footer.note}</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2">
              <Check size={16} />
              TypeScript
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={16} />
              Server-side keys
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
