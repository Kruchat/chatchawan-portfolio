import Link from "next/link";
import { ArrowLeft, Bot, CalendarDays, CheckCircle2, CircleDot, Database } from "lucide-react";
import { DemoLeadForm } from "@/components/DemoLeadForm";
import { formatDate, getDemoOverview } from "@/lib/demo-backoffice";

export const dynamic = "force-dynamic";

const statusLabel = {
  new: "New",
  qualified: "Qualified",
  proposal: "Proposal",
  won: "Won",
};

export default async function BackofficeDemoPage() {
  const overview = await getDemoOverview();

  return (
    <main className="min-h-screen bg-[#17130d] text-[#f7f5ef]">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-[#d6ccbd]" href="/demo">
              <ArrowLeft size={16} />
              Demo overview
            </Link>
            <h1 className="mt-5 text-4xl font-semibold sm:text-5xl">Operations backoffice</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md bg-[#2dd4bf] px-3 py-2 font-mono text-sm font-semibold text-[#042f2e]">
              Supabase live
            </span>
            <span className="rounded-md bg-white/10 px-3 py-2 font-mono text-sm font-semibold text-[#f7f5ef]">
              Next.js API
            </span>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div className="space-y-5">
          <div className="rounded-md border border-white/10 bg-white/[0.06] p-5">
            <div className="flex items-center gap-3">
              <Database className="text-[#f6c453]" />
              <div>
                <p className="font-mono text-sm text-[#d6ccbd]">Database</p>
                <p className="text-xl font-semibold">
                  {overview.configured && !overview.error ? "Connected" : "Not connected"}
                </p>
              </div>
            </div>
            {overview.error ? (
              <p className="mt-4 rounded-md bg-red-950/40 p-3 text-sm text-red-100">{overview.error}</p>
            ) : null}
          </div>

          <div className="rounded-md border border-white/10 bg-white/[0.06] p-5">
            <p className="eyebrow text-[#f6c453]">Task board</p>
            <div className="mt-5 space-y-3">
              {overview.tasks.map((task) => (
                <div className="rounded-md bg-[#f7f5ef] p-4 text-[#17130d]" key={task.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{task.title}</p>
                      <p className="mt-1 font-mono text-xs text-[#6d6255]">{task.area}</p>
                    </div>
                    {task.status === "done" ? (
                      <CheckCircle2 className="text-emerald-700" size={20} />
                    ) : (
                      <CircleDot className="text-[#f6c453]" size={20} />
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                    <span className="tech-chip">{task.status.replace("_", " ")}</span>
                    <span className="inline-flex items-center gap-1 text-[#6d6255]">
                      <CalendarDays size={14} />
                      {formatDate(task.due_date)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-md border border-white/10 bg-[#f7f5ef] p-5 text-[#17130d]">
            <p className="eyebrow">Lead pipeline</p>
            <div className="mt-5 grid gap-3">
              {overview.leads.map((lead) => (
                <div className="rounded-md border border-[#17130d]/10 bg-white p-4" key={lead.id}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold">{lead.company}</p>
                      <p className="mt-1 text-sm text-[#6d6255]">{lead.name}</p>
                    </div>
                    <span className="rounded-md bg-[#17130d] px-3 py-1 font-mono text-xs font-semibold text-[#f7f5ef]">
                      {statusLabel[lead.status]}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="tech-chip">{lead.service}</span>
                    <span className="tech-chip">{lead.budget}</span>
                    <span className="tech-chip">Priority {lead.priority}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-white/10 bg-[#f7f5ef] p-5 text-[#17130d]">
            <div className="mb-5 flex items-center gap-3">
              <Bot />
              <div>
                <p className="eyebrow">Demo intake</p>
                <h2 className="text-2xl font-semibold">Create another lead</h2>
              </div>
            </div>
            <DemoLeadForm />
          </div>
        </div>
      </section>
    </main>
  );
}
