import {
  ArrowUpRight,
  Bot,
  Check,
  Code2,
  Database,
  GitBranch,
  LayoutDashboard,
  Mail,
  MessageSquareText,
  PanelsTopLeft,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getHomeCopy, localizedPath, type Locale } from "@/lib/i18n";

const stack = [
  "Next.js App Router",
  "React",
  "TypeScript",
  "Supabase",
  "PostgreSQL",
  "Tailwind CSS",
  "REST APIs",
  "AI integrations",
];

const serviceIcons = [PanelsTopLeft, Database, Bot, Workflow];

function localHref(locale: Locale, href: string) {
  return localizedPath(locale, href);
}

export function HomePage({ locale }: { locale: Locale }) {
  const copy = getHomeCopy(locale);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f5ef] text-[#17130d]">
      <section className="relative min-h-screen border-b border-[#17130d]/10">
        <div className="absolute inset-0 pattern-grid opacity-70" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#f7f5ef] to-transparent" />

        <header className="relative z-10 mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <Link href={localizedPath(locale, "/")} className="flex items-center gap-3" aria-label="Chatchawan portfolio home">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-[#17130d] text-sm font-semibold text-[#f7f5ef]">
              CT
            </span>
            <span className="text-sm font-semibold uppercase text-[#17130d]/70">
              Chatchawan T.
            </span>
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <nav className="flex flex-wrap items-center gap-2 text-sm font-medium text-[#17130d]/70">
              <a className="nav-link" href="#work">
                {copy.nav.work}
              </a>
              <Link className="nav-link" href="/demo">
                {copy.nav.demo}
              </Link>
              <Link className="nav-link" href={localizedPath(locale, "/projects/ai-service-crm")}>
                {copy.nav.liveProject}
              </Link>
              <a className="nav-link" href="#services">
                {copy.nav.services}
              </a>
              <a className="nav-link" href="#process">
                {copy.nav.process}
              </a>
              <Link className="nav-link" href="/admin">
                {copy.nav.admin}
              </Link>
            </nav>
            <LanguageSwitcher currentLocale={locale} currentPath="/" />
          </div>
        </header>

        <div
          id="top"
          className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center gap-12 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[1fr_1.02fr] lg:px-10"
        >
          <div className="max-w-3xl animate-[fadeUp_0.7s_ease-out_both]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-[#17130d]/15 bg-white/65 px-3 py-2 text-sm font-medium text-[#17130d]/70 shadow-sm backdrop-blur">
              <Sparkles size={16} />
              {copy.hero.eyebrow}
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] text-[#17130d] sm:text-6xl lg:text-7xl">
              {copy.hero.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#4b4236]">
              {copy.hero.body}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a className="primary-action" href="#work">
                <LayoutDashboard size={18} />
                {copy.hero.viewWork}
              </a>
              <Link className="secondary-action" href="/demo">
                <Database size={18} />
                {copy.hero.liveDemo}
              </Link>
              <Link className="secondary-action" href={localizedPath(locale, "/projects/ai-service-crm")}>
                <Bot size={18} />
                {copy.hero.playProject}
              </Link>
              <a className="secondary-action" href="#process">
                <GitBranch size={18} />
                {copy.hero.process}
              </a>
            </div>

            <div className="mt-10 grid gap-4 border-y border-[#17130d]/10 py-5 sm:grid-cols-3">
              {copy.proofPoints.map((item) => (
                <div key={item.label}>
                  <p className="font-mono text-xl font-semibold text-[#17130d]">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-[#6d6255]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[560px] animate-[fadeUp_0.9s_ease-out_0.08s_both]">
            <div className="absolute left-0 top-6 hidden h-40 w-40 border-l border-t border-[#17130d]/20 lg:block" />
            <div className="absolute bottom-8 right-0 hidden h-44 w-44 border-b border-r border-[#17130d]/20 lg:block" />
            <div className="visual-board">
              <div className="visual-topbar">
                <span />
                <span />
                <span />
                <p>app/workbench.tsx</p>
              </div>
              <div className="grid gap-4 p-4 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="interface-panel min-h-[310px]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="eyebrow">{copy.visual.flowEyebrow}</p>
                      <h2 className="mt-2 text-2xl font-semibold">{copy.visual.flowTitle}</h2>
                    </div>
                    <span className="rounded-md bg-[#2dd4bf] px-3 py-1 font-mono text-xs font-semibold text-[#042f2e]">
                      {copy.visual.badge}
                    </span>
                  </div>
                  <div className="mt-8 space-y-3">
                    {copy.visual.steps.map((step, index) => (
                      <div className="pipeline-row" key={step}>
                        <span className="grid h-8 w-8 place-items-center rounded-md bg-[#17130d] font-mono text-xs text-white">
                          0{index + 1}
                        </span>
                        <span className="font-medium">{step}</span>
                        <span className="ml-auto h-2 w-24 rounded-full bg-[#f6c453]" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="interface-panel">
                    <p className="eyebrow">{copy.visual.stack}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {stack.slice(0, 6).map((item) => (
                        <span className="tech-chip" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="interface-panel bg-[#17130d] text-[#f7f5ef]">
                    <div className="flex items-start gap-3">
                      <MessageSquareText className="mt-1 text-[#f6c453]" size={20} />
                      <div>
                        <p className="font-mono text-sm text-[#f6c453]">{copy.visual.clientNoteLabel}</p>
                        <p className="mt-2 text-lg leading-7">{copy.visual.clientNote}</p>
                      </div>
                    </div>
                  </div>
                  <div className="interface-panel">
                    <p className="eyebrow">{copy.visual.quality}</p>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      {copy.visual.checks.map((item) => (
                        <span className="flex items-center gap-2" key={item}>
                          <Check size={16} className="text-[#15803d]" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="section-shell">
        <div className="section-heading">
          <p className="eyebrow">{copy.work.eyebrow}</p>
          <h2>{copy.work.title}</h2>
          <p>{copy.work.body}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {copy.work.projects.map((project) => (
            <article className="project-card" key={project.name}>
              <div className={`h-2 w-24 rounded-full ${project.accent}`} />
              <p className="mt-6 font-mono text-xs uppercase text-[#6d6255]">
                {project.type}
              </p>
              <div className="mt-3 flex items-start justify-between gap-3">
                <h3 className="text-2xl font-semibold leading-8">{project.name}</h3>
                <Link
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[#17130d]/15 text-[#17130d] transition hover:bg-[#17130d] hover:text-[#f7f5ef]"
                  href={localHref(locale, project.href)}
                  aria-label={`Open ${project.name}`}
                >
                  <ArrowUpRight size={18} />
                </Link>
              </div>
              <p className="mt-4 min-h-28 leading-7 text-[#5a5044]">{project.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span className="tech-chip" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="services" className="border-y border-[#17130d]/10 bg-[#17130d] text-[#f7f5ef]">
        <div className="section-shell">
          <div className="section-heading text-[#f7f5ef]">
            <p className="eyebrow text-[#f6c453]">{copy.services.eyebrow}</p>
            <h2>{copy.services.title}</h2>
            <p className="text-[#d6ccbd]">{copy.services.body}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {copy.services.items.map((service, index) => {
              const Icon = serviceIcons[index] ?? Workflow;
              return (
                <article className="service-card" key={service.title}>
                  <Icon size={24} className="text-[#f6c453]" />
                  <div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="mt-3 leading-7 text-[#d6ccbd]">{service.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="process" className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="section-heading">
            <p className="eyebrow">{copy.process.eyebrow}</p>
            <h2>{copy.process.title}</h2>
            <p>{copy.process.body}</p>
          </div>

          <div className="process-list">
            {copy.process.steps.map((step, index) => (
              <div className="process-row" key={step}>
                <span className="process-index">{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-md border border-[#17130d]/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="eyebrow">{copy.summary.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight">
                {copy.summary.title}
              </h2>
              <p className="mt-4 leading-7 text-[#5a5044]">{copy.summary.body}</p>
            </div>
            <div className="rounded-md bg-[#f7f5ef] p-5 font-mono text-sm leading-7 text-[#3b332a]">
              {copy.summary.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#17130d]/10 px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[#6d6255] sm:flex-row sm:items-center sm:justify-between">
          <p>{copy.footer.note}</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={16} />
              {copy.footer.badges[0]}
            </span>
            <span className="inline-flex items-center gap-2">
              <Code2 size={16} />
              {copy.footer.badges[1]}
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail size={16} />
              {copy.footer.badges[2]}
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
