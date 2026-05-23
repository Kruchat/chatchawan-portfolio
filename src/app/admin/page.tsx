import {
  Activity,
  ClipboardList,
  Database,
  LogOut,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { formatDate, getDemoOverview, type DemoLead } from "@/lib/demo-backoffice";

export const dynamic = "force-dynamic";

const statusStyles: Record<DemoLead["status"], string> = {
  new: "bg-sky-50 text-sky-800 border-sky-200",
  qualified: "bg-emerald-50 text-emerald-800 border-emerald-200",
  proposal: "bg-amber-50 text-amber-900 border-amber-200",
  won: "bg-[#17130d] text-[#f7f5ef] border-[#17130d]",
};

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const overview = await getDemoOverview({ leadLimit: 50, taskLimit: 50, eventLimit: 30 });

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#17130d]">
      <header className="border-b border-[#17130d]/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <Link className="text-sm font-semibold text-[#6d6255]" href="/">
              Portfolio
            </Link>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Portfolio backoffice</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-800">
              <ShieldCheck size={16} />
              Logged in
            </span>
            <form action="/api/admin/logout" method="post">
              <button className="secondary-action" type="submit">
                <LogOut size={18} />
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <section className="section-shell">
        {overview.error ? (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 font-semibold text-red-700">
            {overview.error}
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-4">
          <AdminStat icon={Users} label="Total leads" value={overview.stats.totalLeads} />
          <AdminStat icon={Activity} label="Hot leads" value={overview.stats.hotLeads} />
          <AdminStat icon={ClipboardList} label="Open tasks" value={overview.stats.openTasks} />
          <AdminStat icon={Database} label="Completed" value={overview.stats.completedTasks} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-md border border-[#17130d]/10 bg-white shadow-sm">
            <div className="border-b border-[#17130d]/10 p-5">
              <p className="eyebrow">Lead CRM</p>
              <h2 className="mt-2 text-3xl font-semibold">Latest customer requests</h2>
            </div>
            <div className="divide-y divide-[#17130d]/10">
              {overview.leads.map((lead) => (
                <article className="grid gap-4 p-5 xl:grid-cols-[1fr_12rem]" key={lead.id}>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-semibold">{lead.company}</h3>
                      <span className={`rounded-md border px-2.5 py-1 font-mono text-xs font-bold ${statusStyles[lead.status]}`}>
                        {lead.status}
                      </span>
                      <span className="tech-chip">{lead.service}</span>
                    </div>
                    <p className="mt-2 leading-7 text-[#5a5044]">{lead.notes || "No notes yet."}</p>
                  </div>
                  <div className="rounded-md bg-[#f7f5ef] p-3 font-mono text-sm leading-6 text-[#6d6255]">
                    <p className="font-semibold text-[#17130d]">{lead.name}</p>
                    <p>{lead.email ?? "No email"}</p>
                    <p>{lead.budget}</p>
                    <p>{formatDate(lead.created_at)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="space-y-6">
            <section className="rounded-md border border-[#17130d]/10 bg-white p-5 shadow-sm">
              <p className="eyebrow">Task board</p>
              <div className="mt-5 space-y-3">
                {overview.tasks.map((task) => (
                  <div className="rounded-md border border-[#17130d]/10 bg-[#f7f5ef] p-4" key={task.id}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">{task.title}</p>
                        <p className="mt-1 font-mono text-xs text-[#7a6c5d]">{task.area}</p>
                      </div>
                      <span className="tech-chip">{task.status.replace("_", " ")}</span>
                    </div>
                    <p className="mt-3 text-sm text-[#6d6255]">
                      Due {formatDate(task.due_date)} · Impact {task.impact}/5
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-md border border-[#17130d]/10 bg-[#17130d] p-5 text-[#f7f5ef] shadow-sm">
              <p className="eyebrow text-[#f6c453]">Activity</p>
              <div className="mt-5 space-y-3">
                {overview.events.map((event) => (
                  <div className="rounded-md bg-white/10 p-3" key={event.id}>
                    <p className="font-semibold">{event.message}</p>
                    <p className="mt-1 font-mono text-xs text-[#d6ccbd]">
                      {formatDate(event.created_at)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
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
  icon: typeof Users;
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
