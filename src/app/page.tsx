import {
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

const proofPoints = [
  {
    value: "10+",
    label: "years building business systems",
  },
  {
    value: "Thai + global",
    label: "client experience",
  },
  {
    value: "UTC+7",
    label: "async friendly timezone",
  },
];

const projects = [
  {
    name: "Hong Kong Mode Booking Workflow",
    type: "Tour booking platform",
    summary:
      "Next.js App Router system for tour discovery, booking flow, pickup registration, invoices, admin content, and Supabase-backed operations.",
    tags: ["Next.js", "Supabase", "Admin dashboard", "Booking flow"],
    accent: "bg-[#f6c453]",
  },
  {
    name: "AI Chatbot and LINE OA Automation",
    type: "Automation service",
    summary:
      "Conversation flows for lead intake, FAQ handling, booking support, and handoff logic with API integrations for small teams.",
    tags: ["AI chatbot", "Automation", "API", "LINE OA"],
    accent: "bg-[#2dd4bf]",
  },
  {
    name: "Responsive School and Public-Service Sites",
    type: "Website delivery",
    summary:
      "Fast, mobile-ready websites with structured content, forms, admin-friendly updates, and deployment support for education teams.",
    tags: ["React", "Responsive UI", "Forms", "Deployment"],
    accent: "bg-[#f87171]",
  },
];

const services = [
  {
    icon: PanelsTopLeft,
    title: "App Router interfaces",
    body: "Clean route-level UI, responsive layouts, admin screens, forms, and client-ready product pages.",
  },
  {
    icon: Database,
    title: "Supabase and Postgres",
    body: "Schema-aware dashboards, CRUD flows, auth-aware data access, migrations, and typed mapping between DB and UI.",
  },
  {
    icon: Bot,
    title: "AI product features",
    body: "Chat flows, prompt pipelines, API wrappers, automation handoffs, and practical MVPs that can ship in stages.",
  },
  {
    icon: Workflow,
    title: "Integration cleanup",
    body: "Webhooks, third-party APIs, payment status logic, deployment checks, and bug fixes in existing systems.",
  },
];

const deliverySteps = [
  "Read the existing codebase before changing it",
  "Confirm the smallest useful first milestone",
  "Ship a focused PR with clear notes",
  "Test the flow and document handoff details",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f5ef] text-[#17130d]">
      <section className="relative min-h-screen border-b border-[#17130d]/10">
        <div className="absolute inset-0 pattern-grid opacity-70" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#f7f5ef] to-transparent" />

        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="Chatchawan portfolio home">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-[#17130d] text-sm font-semibold text-[#f7f5ef]">
              CT
            </span>
            <span className="hidden text-sm font-semibold uppercase tracking-[0.18em] text-[#17130d]/70 sm:inline">
              Chatchawan T.
            </span>
          </a>
          <nav className="flex items-center gap-2 text-sm font-medium text-[#17130d]/70">
            <a className="nav-link" href="#work">
              Work
            </a>
            <Link className="nav-link" href="/demo">
              Demo
            </Link>
            <a className="nav-link" href="#services">
              Services
            </a>
            <a className="nav-link" href="#process">
              Process
            </a>
          </nav>
        </header>

        <div
          id="top"
          className="relative z-10 mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[1fr_1.02fr] lg:px-10"
        >
          <div className="max-w-3xl animate-[fadeUp_0.7s_ease-out_both]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-[#17130d]/15 bg-white/65 px-3 py-2 text-sm font-medium text-[#17130d]/70 shadow-sm backdrop-blur">
              <Sparkles size={16} />
              Next.js, AI automation, and business dashboards
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] text-[#17130d] sm:text-6xl lg:text-7xl">
              I build practical AI and booking systems that teams can actually run.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#4b4236]">
              Programmer based in Thailand, focused on Next.js App Router, TypeScript,
              Supabase, APIs, and AI workflow integrations for schools, travel,
              small business, and internal operations.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="primary-action" href="#work">
                <LayoutDashboard size={18} />
                View work
              </a>
              <Link className="secondary-action" href="/demo">
                <Database size={18} />
                Live demo
              </Link>
              <a className="secondary-action" href="#process">
                <GitBranch size={18} />
                First PR process
              </a>
            </div>

            <div className="mt-10 grid gap-4 border-y border-[#17130d]/10 py-5 sm:grid-cols-3">
              {proofPoints.map((item) => (
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
                      <p className="eyebrow">Production flow</p>
                      <h2 className="mt-2 text-2xl font-semibold">Booking and AI intake</h2>
                    </div>
                    <span className="rounded-md bg-[#2dd4bf] px-3 py-1 font-mono text-xs font-semibold text-[#042f2e]">
                      live-ready
                    </span>
                  </div>
                  <div className="mt-8 space-y-3">
                    {["User request", "AI triage", "Supabase write", "Admin review"].map(
                      (step, index) => (
                        <div className="pipeline-row" key={step}>
                          <span className="grid h-8 w-8 place-items-center rounded-md bg-[#17130d] font-mono text-xs text-white">
                            0{index + 1}
                          </span>
                          <span className="font-medium">{step}</span>
                          <span className="ml-auto h-2 w-24 rounded-full bg-[#f6c453]" />
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="interface-panel">
                    <p className="eyebrow">Stack</p>
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
                        <p className="font-mono text-sm text-[#f6c453]">client note</p>
                        <p className="mt-2 text-lg leading-7">
                          Clear async updates, scoped milestones, and handoff notes.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="interface-panel">
                    <p className="eyebrow">Quality checks</p>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      {["Types", "Responsive", "API paths", "Deploy"].map((item) => (
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
          <p className="eyebrow">Selected work</p>
          <h2>Systems and case studies for Upwork clients to review.</h2>
          <p>
            These examples focus on the same skills requested in AI product,
            dashboard, and integration roles.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {projects.map((project) => (
            <article className="project-card" key={project.name}>
              <div className={`h-2 w-24 rounded-full ${project.accent}`} />
              <p className="mt-6 font-mono text-xs uppercase text-[#6d6255]">
                {project.type}
              </p>
              <h3 className="mt-3 text-2xl font-semibold leading-8">{project.name}</h3>
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
            <p className="eyebrow text-[#f6c453]">What I can own</p>
            <h2>Useful full-stack work without turning the project into a maze.</h2>
            <p className="text-[#d6ccbd]">
              Best fit: focused milestones, existing app cleanup, AI features, and
              dashboards where speed and clarity matter.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
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
            <p className="eyebrow">Delivery process</p>
            <h2>Built for scoped PRs, not vague promises.</h2>
            <p>
              A practical flow for clients who already have a product and need a
              reliable engineer to understand it, fix it, and leave it cleaner.
            </p>
          </div>

          <div className="process-list">
            {deliverySteps.map((step, index) => (
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
              <p className="eyebrow">Proposal-ready summary</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight">
                Next.js App Router developer for AI, Supabase, and dashboard work.
              </h2>
              <p className="mt-4 leading-7 text-[#5a5044]">
                Available for a well-scoped first PR, especially email editors,
                popup builders, admin dashboards, booking workflows, API cleanup,
                and AI-assisted product features.
              </p>
            </div>
            <div className="rounded-md bg-[#f7f5ef] p-5 font-mono text-sm leading-7 text-[#3b332a]">
              <p>Next.js App Router project: this portfolio with live Supabase demo.</p>
              <p>Tricky TypeScript fix: DB row types, API payloads, and optional UI fields.</p>
              <p>Timezone: Asia/Bangkok (UTC+7), async friendly.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#17130d]/10 px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[#6d6255] sm:flex-row sm:items-center sm:justify-between">
          <p>Chatchawan T. - Next.js, AI automation, and business systems.</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={16} />
              Contract-first work only
            </span>
            <span className="inline-flex items-center gap-2">
              <Code2 size={16} />
              TypeScript first
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail size={16} />
              Upwork-ready
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
