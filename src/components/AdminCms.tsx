import {
  Activity,
  BriefcaseBusiness,
  ClipboardList,
  Database,
  FileText,
  Globe2,
  LogOut,
  MessageSquareText,
  PackageCheck,
  Settings,
} from "lucide-react";
import Link from "next/link";
import {
  contactStatuses,
  linesToTextarea,
  requestStatuses,
  type AdminCmsData,
  type ContactMessage,
  type HiringRequest,
  type PortfolioProject,
  type ServicePackage,
  type SiteContent,
} from "@/lib/cms";
import { locales, type Locale } from "@/lib/i18n";

const localeLabels: Record<Locale, string> = {
  en: "English",
  th: "ไทย",
  zh: "中文",
};

export function AdminCms({ data }: { data: AdminCmsData }) {
  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#17130d]">
      <header className="border-b border-[#17130d]/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <Link className="text-sm font-semibold text-[#6d6255]" href="/">
              Public website
            </Link>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Portfolio CMS backoffice</h1>
            <p className="mt-3 max-w-3xl leading-7 text-[#5a5044]">
              Manage site content, personal profile, service packages, project case studies, chat links, and online hiring requests.
            </p>
          </div>
          <form action="/api/admin/logout" method="post">
            <button className="secondary-action" type="submit">
              <LogOut size={18} />
              Logout
            </button>
          </form>
        </div>
      </header>

      <section className="section-shell">
        {data.error ? (
          <div className="mb-6 rounded-md border border-amber-200 bg-amber-50 p-4 font-semibold text-amber-900">
            {data.error}
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-4">
          <AdminStat icon={Globe2} label="Languages" value={locales.length} />
          <AdminStat icon={PackageCheck} label="Services" value={data.services.length} />
          <AdminStat icon={BriefcaseBusiness} label="Requests" value={data.hiringRequests.length} />
          <AdminStat icon={MessageSquareText} label="Messages" value={data.contactMessages.length} />
        </div>

        <div className="mt-8 grid gap-6">
          <SettingsSection data={data} />
          <ContentSection contentByLocale={data.contentByLocale} />
          <ServicesSection services={data.services} />
          <ProjectsSection projects={data.projects} />
          <RequestsSection requests={data.hiringRequests} />
          <MessagesSection messages={data.contactMessages} />
        </div>
      </section>
    </main>
  );
}

function AdminStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Globe2;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-md border border-[#17130d]/10 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-sm font-bold uppercase text-[#7a6c5d]">{label}</p>
        <Icon className="text-[#0f766e]" size={19} />
      </div>
      <p className="mt-4 text-4xl font-semibold">{value}</p>
    </div>
  );
}

function Panel({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Settings;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-md border border-[#17130d]/10 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-[#17130d]/10 p-5">
        <Icon className="text-[#0f766e]" />
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function SettingsSection({ data }: { data: AdminCmsData }) {
  return (
    <Panel icon={Settings} title="Site settings and chat links">
      <form action="/api/admin/cms" method="post" className="grid gap-4 lg:grid-cols-2">
        <input name="intent" type="hidden" value="settings" />
        <label className="field-label">
          Public email
          <input className="field-input" name="email" defaultValue={data.settings.email} />
        </label>
        <label className="field-label">
          LINE URL
          <input className="field-input" name="lineUrl" defaultValue={data.settings.lineUrl} />
        </label>
        <label className="field-label">
          WhatsApp URL
          <input className="field-input" name="whatsappUrl" defaultValue={data.settings.whatsappUrl} />
        </label>
        <label className="field-label">
          Messenger URL
          <input className="field-input" name="messengerUrl" defaultValue={data.settings.messengerUrl} />
        </label>
        <label className="field-label lg:col-span-2">
          Response note
          <textarea className="field-input min-h-24 resize-y" name="responseNote" defaultValue={data.settings.responseNote} />
        </label>
        <div className="lg:col-span-2">
          <button className="primary-action" type="submit">
            <Settings size={18} />
            Save settings
          </button>
        </div>
      </form>
    </Panel>
  );
}

function ContentSection({ contentByLocale }: { contentByLocale: Record<Locale, SiteContent> }) {
  return (
    <Panel icon={FileText} title="Page content and personal profile">
      <div className="grid gap-5">
        {locales.map((locale) => {
          const content = contentByLocale[locale];
          return (
            <details className="rounded-md border border-[#17130d]/10 bg-[#f7f5ef] p-4" key={locale} open={locale === "en"}>
              <summary className="cursor-pointer text-xl font-semibold">{localeLabels[locale]}</summary>
              <form action="/api/admin/cms" method="post" className="mt-5 grid gap-4">
                <input name="intent" type="hidden" value="site_content" />
                <input name="locale" type="hidden" value={locale} />
                <div className="grid gap-4 lg:grid-cols-2">
                  <label className="field-label">
                    Home eyebrow
                    <input className="field-input" name="homeEyebrow" defaultValue={content.home.eyebrow} />
                  </label>
                  <label className="field-label">
                    Home title
                    <input className="field-input" name="homeTitle" defaultValue={content.home.title} />
                  </label>
                  <label className="field-label lg:col-span-2">
                    Home body
                    <textarea className="field-input min-h-24 resize-y" name="homeBody" defaultValue={content.home.body} />
                  </label>
                  <label className="field-label">
                    Primary CTA
                    <input className="field-input" name="primaryCta" defaultValue={content.home.primaryCta} />
                  </label>
                  <label className="field-label">
                    Secondary CTA
                    <input className="field-input" name="secondaryCta" defaultValue={content.home.secondaryCta} />
                  </label>
                  <label className="field-label lg:col-span-2">
                    Proof points (value | label)
                    <textarea
                      className="field-input min-h-24 resize-y"
                      name="proofPoints"
                      defaultValue={content.home.proofPoints.map((item) => `${item.value} | ${item.label}`).join("\n")}
                    />
                  </label>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <label className="field-label">
                    About eyebrow
                    <input className="field-input" name="aboutEyebrow" defaultValue={content.about.eyebrow} />
                  </label>
                  <label className="field-label">
                    About title
                    <input className="field-input" name="aboutTitle" defaultValue={content.about.title} />
                  </label>
                  <label className="field-label lg:col-span-2">
                    About body
                    <textarea className="field-input min-h-28 resize-y" name="aboutBody" defaultValue={content.about.body} />
                  </label>
                  <label className="field-label">
                    Experience title
                    <input className="field-input" name="experienceTitle" defaultValue={content.about.experienceTitle} />
                  </label>
                  <label className="field-label">
                    Skills title
                    <input className="field-input" name="skillsTitle" defaultValue={content.about.skillsTitle} />
                  </label>
                  <label className="field-label">
                    Experience lines
                    <textarea className="field-input min-h-32 resize-y" name="experience" defaultValue={linesToTextarea(content.about.experience)} />
                  </label>
                  <label className="field-label">
                    Skills
                    <textarea className="field-input min-h-32 resize-y" name="skills" defaultValue={linesToTextarea(content.about.skills)} />
                  </label>
                  <label className="field-label">
                    Workflow title
                    <input className="field-input" name="workflowTitle" defaultValue={content.about.workflowTitle} />
                  </label>
                  <label className="field-label">
                    Timezone/contact note
                    <input className="field-input" name="timezone" defaultValue={content.about.timezone} />
                  </label>
                  <label className="field-label lg:col-span-2">
                    Workflow lines
                    <textarea className="field-input min-h-32 resize-y" name="workflow" defaultValue={linesToTextarea(content.about.workflow)} />
                  </label>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <label className="field-label">
                    Services title
                    <input className="field-input" name="servicesTitle" defaultValue={content.services.title} />
                  </label>
                  <label className="field-label">
                    Projects title
                    <input className="field-input" name="projectsTitle" defaultValue={content.projects.title} />
                  </label>
                  <label className="field-label">
                    Services body
                    <textarea className="field-input min-h-24 resize-y" name="servicesBody" defaultValue={content.services.body} />
                  </label>
                  <label className="field-label">
                    Projects body
                    <textarea className="field-input min-h-24 resize-y" name="projectsBody" defaultValue={content.projects.body} />
                  </label>
                  <label className="field-label">
                    Contact title
                    <input className="field-input" name="contactTitle" defaultValue={content.contact.title} />
                  </label>
                  <label className="field-label">
                    Footer note
                    <input className="field-input" name="footerNote" defaultValue={content.footer.note} />
                  </label>
                  <label className="field-label lg:col-span-2">
                    Contact body
                    <textarea className="field-input min-h-24 resize-y" name="contactBody" defaultValue={content.contact.body} />
                  </label>
                </div>
                <button className="primary-action w-fit" type="submit">
                  <FileText size={18} />
                  Save {localeLabels[locale]} content
                </button>
              </form>
            </details>
          );
        })}
      </div>
    </Panel>
  );
}

function ServicesSection({ services }: { services: ServicePackage[] }) {
  return (
    <Panel icon={PackageCheck} title="Service packages">
      <div className="grid gap-4">
        <ServiceForm />
        {services.map((service) => (
          <ServiceForm key={`${service.locale}-${service.slug}`} service={service} />
        ))}
      </div>
    </Panel>
  );
}

function ServiceForm({ service }: { service?: ServicePackage }) {
  return (
    <details className="rounded-md border border-[#17130d]/10 bg-[#f7f5ef] p-4" open={!service}>
      <summary className="cursor-pointer font-semibold">
        {service ? `${localeLabels[service.locale]} - ${service.title}` : "Add service package row"}
      </summary>
      <form action="/api/admin/cms" method="post" className="mt-5 grid gap-4 lg:grid-cols-2">
        <input name="intent" type="hidden" value="service" />
        <input name="id" type="hidden" value={service?.id ?? ""} />
        <label className="field-label">
          Locale
          <select className="field-input" name="locale" defaultValue={service?.locale ?? "en"}>
            {locales.map((locale) => (
              <option key={locale} value={locale}>{localeLabels[locale]}</option>
            ))}
          </select>
        </label>
        <label className="field-label">
          Slug
          <input className="field-input" name="slug" defaultValue={service?.slug ?? ""} required />
        </label>
        <label className="field-label">
          Title
          <input className="field-input" name="title" defaultValue={service?.title ?? ""} required />
        </label>
        <label className="field-label">
          Price from
          <input className="field-input" name="priceFrom" defaultValue={service?.priceFrom ?? ""} />
        </label>
        <label className="field-label">
          Timeline
          <input className="field-input" name="timeline" defaultValue={service?.timeline ?? ""} />
        </label>
        <label className="field-label">
          Sort order
          <input className="field-input" name="sortOrder" defaultValue={service?.sortOrder ?? 10} type="number" />
        </label>
        <label className="field-label lg:col-span-2">
          Summary
          <textarea className="field-input min-h-24 resize-y" name="summary" defaultValue={service?.summary ?? ""} />
        </label>
        <label className="field-label lg:col-span-2">
          Description
          <textarea className="field-input min-h-28 resize-y" name="description" defaultValue={service?.description ?? ""} />
        </label>
        <label className="field-label">
          Features
          <textarea className="field-input min-h-32 resize-y" name="features" defaultValue={service ? linesToTextarea(service.features) : ""} />
        </label>
        <label className="field-label">
          Deliverables
          <textarea className="field-input min-h-32 resize-y" name="deliverables" defaultValue={service ? linesToTextarea(service.deliverables) : ""} />
        </label>
        <label className="inline-flex items-center gap-2 font-semibold">
          <input name="isActive" type="checkbox" defaultChecked={service?.isActive ?? true} />
          Active
        </label>
        <div className="lg:col-span-2">
          <button className="primary-action" type="submit">
            <PackageCheck size={18} />
            Save service
          </button>
        </div>
      </form>
    </details>
  );
}

function ProjectsSection({ projects }: { projects: PortfolioProject[] }) {
  return (
    <Panel icon={Database} title="Projects and case studies">
      <div className="grid gap-4">
        <ProjectForm />
        {projects.map((project) => (
          <ProjectForm key={`${project.locale}-${project.slug}`} project={project} />
        ))}
      </div>
    </Panel>
  );
}

function ProjectForm({ project }: { project?: PortfolioProject }) {
  return (
    <details className="rounded-md border border-[#17130d]/10 bg-[#f7f5ef] p-4" open={!project}>
      <summary className="cursor-pointer font-semibold">
        {project ? `${localeLabels[project.locale]} - ${project.title}` : "Add project row"}
      </summary>
      <form action="/api/admin/cms" method="post" className="mt-5 grid gap-4 lg:grid-cols-2">
        <input name="intent" type="hidden" value="project" />
        <input name="id" type="hidden" value={project?.id ?? ""} />
        <label className="field-label">
          Locale
          <select className="field-input" name="locale" defaultValue={project?.locale ?? "en"}>
            {locales.map((locale) => (
              <option key={locale} value={locale}>{localeLabels[locale]}</option>
            ))}
          </select>
        </label>
        <label className="field-label">
          Slug
          <input className="field-input" name="slug" defaultValue={project?.slug ?? ""} required />
        </label>
        <label className="field-label">
          Title
          <input className="field-input" name="title" defaultValue={project?.title ?? ""} required />
        </label>
        <label className="field-label">
          Type
          <input className="field-input" name="type" defaultValue={project?.type ?? ""} />
        </label>
        <label className="field-label">
          Href
          <input className="field-input" name="href" defaultValue={project?.href ?? "/projects/ai-service-crm"} />
        </label>
        <label className="field-label">
          Sort order
          <input className="field-input" name="sortOrder" defaultValue={project?.sortOrder ?? 10} type="number" />
        </label>
        <label className="field-label lg:col-span-2">
          Summary
          <textarea className="field-input min-h-28 resize-y" name="summary" defaultValue={project?.summary ?? ""} />
        </label>
        <label className="field-label lg:col-span-2">
          Tags
          <textarea className="field-input min-h-24 resize-y" name="tags" defaultValue={project ? linesToTextarea(project.tags) : ""} />
        </label>
        <label className="inline-flex items-center gap-2 font-semibold">
          <input name="isActive" type="checkbox" defaultChecked={project?.isActive ?? true} />
          Active
        </label>
        <div className="lg:col-span-2">
          <button className="primary-action" type="submit">
            <Database size={18} />
            Save project
          </button>
        </div>
      </form>
    </details>
  );
}

function RequestsSection({ requests }: { requests: HiringRequest[] }) {
  return (
    <Panel icon={BriefcaseBusiness} title="Online hiring requests">
      <div className="grid gap-3">
        {requests.length ? requests.map((request) => <RequestCard key={request.id} request={request} />) : (
          <p className="rounded-md bg-[#f7f5ef] p-4 text-[#6d6255]">No hiring requests yet.</p>
        )}
      </div>
    </Panel>
  );
}

function RequestCard({ request }: { request: HiringRequest }) {
  return (
    <article className="rounded-md border border-[#17130d]/10 bg-[#f7f5ef] p-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold">{request.name}</h3>
            <span className="tech-chip">{request.locale}</span>
            <span className="tech-chip">{request.status}</span>
          </div>
          <p className="mt-2 font-semibold text-[#5a5044]">{request.service_title ?? request.service_slug ?? "General request"}</p>
          <p className="mt-3 leading-7 text-[#5a5044]">{request.project_goal}</p>
          <p className="mt-3 font-mono text-sm text-[#7a6c5d]">
            {request.company ?? "No company"} · {request.email ?? "No email"} · {request.contact_channel ?? "No channel"}
          </p>
        </div>
        <form action="/api/admin/cms" method="post" className="flex flex-col gap-2">
          <input name="intent" type="hidden" value="request_status" />
          <input name="id" type="hidden" value={request.id} />
          <select className="field-input" name="status" defaultValue={request.status}>
            {requestStatuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <button className="secondary-action min-h-10 px-3 py-2 text-sm" type="submit">
            <Activity size={16} />
            Update
          </button>
        </form>
      </div>
    </article>
  );
}

function MessagesSection({ messages }: { messages: ContactMessage[] }) {
  return (
    <Panel icon={ClipboardList} title="Contact messages">
      <div className="grid gap-3">
        {messages.length ? messages.map((message) => <MessageCard key={message.id} message={message} />) : (
          <p className="rounded-md bg-[#f7f5ef] p-4 text-[#6d6255]">No contact messages yet.</p>
        )}
      </div>
    </Panel>
  );
}

function MessageCard({ message }: { message: ContactMessage }) {
  return (
    <article className="rounded-md border border-[#17130d]/10 bg-[#f7f5ef] p-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold">{message.name}</h3>
            <span className="tech-chip">{message.locale}</span>
            <span className="tech-chip">{message.status}</span>
          </div>
          <p className="mt-3 leading-7 text-[#5a5044]">{message.message}</p>
          <p className="mt-3 font-mono text-sm text-[#7a6c5d]">
            {message.company ?? "No company"} · {message.email ?? "No email"} · {message.channel ?? "No channel"}
          </p>
        </div>
        <form action="/api/admin/cms" method="post" className="flex flex-col gap-2">
          <input name="intent" type="hidden" value="contact_status" />
          <input name="id" type="hidden" value={message.id} />
          <select className="field-input" name="status" defaultValue={message.status}>
            {contactStatuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <button className="secondary-action min-h-10 px-3 py-2 text-sm" type="submit">
            <Activity size={16} />
            Update
          </button>
        </form>
      </div>
    </article>
  );
}
