import Link from "next/link";
import { Activity, ArrowLeft, Database, LayoutDashboard, ShieldCheck } from "lucide-react";
import { DemoLeadForm } from "@/components/DemoLeadForm";
import { formatDate, getDemoOverview } from "@/lib/demo-backoffice";

export const dynamic = "force-dynamic";

export default async function DemoPage() {
  const overview = await getDemoOverview();

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#17130d]">
      <section className="border-b border-[#17130d]/10">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
          <Link className="inline-flex items-center gap-2 text-sm font-semibold text-[#6d6255]" href="/">
            <ArrowLeft size={16} />
            Portfolio
          </Link>

          <div className="grid gap-8 py-12 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div>
              <p className="eyebrow">Live demo</p>
              <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-tight sm:text-6xl">
                Backoffice demo connected to a real Supabase database.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5a5044]">
                A small client-operations system for lead intake, task tracking,
                and activity history. Data is loaded from the production Supabase
                project behind this portfolio.
              </p>
            </div>

            <div className="rounded-md border border-[#17130d]/10 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-md bg-[#17130d] text-[#f7f5ef]">
                  <Database size={21} />
                </span>
                <div>
                  <p className="font-mono text-sm font-semibold text-[#6d6255]">database status</p>
                  <p className="text-xl font-semibold">
                    {overview.configured && !overview.error ? "Connected" : "Needs configuration"}
                  </p>
                </div>
              </div>
              {overview.error ? (
                <p className="mt-4 rounded-md bg-red-50 p-3 text-sm font-medium text-red-700">
                  {overview.error}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label="Leads" value={overview.stats.totalLeads} />
          <StatCard label="Hot leads" value={overview.stats.hotLeads} />
          <StatCard label="Open tasks" value={overview.stats.openTasks} />
          <StatCard label="Done" value={overview.stats.completedTasks} />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow">Lead intake</p>
                <h2 className="mt-2 text-3xl font-semibold">Create a demo record</h2>
              </div>
              <Link className="secondary-action hidden sm:inline-flex" href="/demo/backoffice">
                <LayoutDashboard size={18} />
                Backoffice
              </Link>
            </div>
            <DemoLeadForm />
          </div>

          <div className="rounded-md border border-[#17130d]/10 bg-white p-5 shadow-sm">
            <p className="eyebrow">Recent activity</p>
            <div className="mt-5 space-y-3">
              {overview.events.map((event) => (
                <div className="rounded-md bg-[#f7f5ef] p-3" key={event.id}>
                  <p className="font-medium">{event.message}</p>
                  <p className="mt-1 font-mono text-xs text-[#7a6c5d]">
                    {formatDate(event.created_at)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-md border border-[#17130d]/10 bg-white shadow-sm">
          <div className="border-b border-[#17130d]/10 p-5">
            <p className="eyebrow">Live leads</p>
            <h2 className="mt-2 text-3xl font-semibold">Supabase records</h2>
          </div>
          <div className="grid divide-y divide-[#17130d]/10">
            {overview.leads.map((lead) => (
              <div className="grid gap-4 p-5 md:grid-cols-[1fr_auto]" key={lead.id}>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-semibold">{lead.company}</h3>
                    <span className="tech-chip">{lead.service}</span>
                    <span className="tech-chip">{lead.status}</span>
                  </div>
                  <p className="mt-2 leading-7 text-[#5a5044]">{lead.notes || "No notes yet."}</p>
                </div>
                <div className="font-mono text-sm text-[#6d6255] md:text-right">
                  <p>{lead.name}</p>
                  <p>{lead.budget}</p>
                  <p>{formatDate(lead.created_at)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-10 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 rounded-md bg-[#17130d] p-6 text-[#f7f5ef] md:grid-cols-2">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-1 text-[#f6c453]" />
            <p className="leading-7">
              Server-side service key only. Public visitors never receive database credentials.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Activity className="mt-1 text-[#2dd4bf]" />
            <p className="leading-7">
              The dashboard updates from Supabase records created through the Next.js API route.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-[#17130d]/10 bg-white p-5 shadow-sm">
      <p className="font-mono text-sm font-semibold uppercase text-[#7a6c5d]">{label}</p>
      <p className="mt-3 text-4xl font-semibold">{value}</p>
    </div>
  );
}
