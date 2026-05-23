import { CheckCircle2, Clock, Code2, Workflow } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { SiteHeader } from "@/components/SiteHeader";
import type { PublicSiteData } from "@/lib/cms";
import type { Locale } from "@/lib/i18n";

export function AboutPageContent({ locale, site }: { locale: Locale; site: PublicSiteData }) {
  const { content } = site;

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#17130d]">
      <SiteHeader locale={locale} content={content} currentPath="/about" />
      <section className="border-b border-[#17130d]/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <div>
            <p className="eyebrow">{content.about.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-tight sm:text-6xl">
              {content.about.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5a5044]">
              {content.about.body}
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-md border border-[#17130d]/10 bg-white px-4 py-3 font-mono text-sm font-semibold text-[#6d6255] shadow-sm">
              <Clock size={18} />
              {content.about.timezone}
            </div>
          </div>

          <div className="visual-board">
            <div className="visual-topbar">
              <span />
              <span />
              <span />
              <p>profile/workflow.json</p>
            </div>
            <div className="grid gap-4 p-4">
              <ProfilePanel icon={Code2} title={content.about.experienceTitle} items={content.about.experience} />
              <ProfilePanel icon={CheckCircle2} title={content.about.skillsTitle} items={content.about.skills} compact />
              <ProfilePanel icon={Workflow} title={content.about.workflowTitle} items={content.about.workflow} />
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="eyebrow">{content.contact.eyebrow}</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight">{content.contact.title}</h2>
            <p className="mt-4 leading-7 text-[#5a5044]">{content.contact.body}</p>
          </div>
          <div className="rounded-md border border-[#17130d]/10 bg-white p-5 shadow-sm">
            <ContactForm locale={locale} />
          </div>
        </div>
      </section>
    </main>
  );
}

function ProfilePanel({
  icon: Icon,
  title,
  items,
  compact = false,
}: {
  icon: typeof Code2;
  title: string;
  items: string[];
  compact?: boolean;
}) {
  return (
    <section className="interface-panel">
      <div className="flex items-center gap-3">
        <Icon className="text-[#0f766e]" size={20} />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className={compact ? "mt-4 flex flex-wrap gap-2" : "mt-4 grid gap-3"}>
        {items.map((item) =>
          compact ? (
            <span className="tech-chip" key={item}>
              {item}
            </span>
          ) : (
            <p className="rounded-md bg-white p-3 leading-7 text-[#5a5044]" key={item}>
              {item}
            </p>
          ),
        )}
      </div>
    </section>
  );
}
