import { ArrowLeft, Code2, Database, PlayCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AiServiceCrmProject } from "@/components/AiServiceCrmProject";
import { getDemoOverview } from "@/lib/demo-backoffice";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AI Service CRM Live Project | Chatchawan T.",
  description:
    "Interactive Next.js and Supabase CRM demo for AI intake, lead qualification, and live database updates.",
};

export default async function AiServiceCrmPage() {
  const overview = await getDemoOverview();

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#17130d]">
      <section className="border-b border-[#17130d]/10">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
          <Link className="inline-flex items-center gap-2 text-sm font-semibold text-[#6d6255]" href="/">
            <ArrowLeft size={16} />
            Portfolio
          </Link>

          <div className="grid gap-8 py-12 lg:grid-cols-[1fr_0.82fr] lg:items-end">
            <div>
              <p className="eyebrow">Live client project</p>
              <h1 className="mt-4 max-w-5xl text-5xl font-semibold leading-tight sm:text-6xl">
                AI Service CRM that clients can actually click, test, and understand.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5a5044]">
                This is a focused mini product for Upwork and international clients:
                an AI-style intake workflow, a generated delivery plan, and real
                Supabase CRM records behind the screen.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a className="primary-action" href="#playground">
                  <PlayCircle size={18} />
                  Try the workflow
                </a>
                <Link className="secondary-action" href="/demo/backoffice">
                  <Database size={18} />
                  View backoffice
                </Link>
              </div>
            </div>

            <div className="rounded-md border border-[#17130d]/10 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <Code2 className="mt-1 text-[#17130d]" />
                <div>
                  <p className="font-mono text-sm font-semibold text-[#7a6c5d]">
                    Proposal proof
                  </p>
                  <p className="mt-2 text-xl font-semibold leading-7">
                    Next.js App Router, TypeScript, API routes, and Supabase.
                  </p>
                  <p className="mt-3 leading-7 text-[#5a5044]">
                    Send this page when a client asks for a real project link, not
                    just a static portfolio screenshot.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="playground" className="section-shell">
        <AiServiceCrmProject initialOverview={overview} />
      </section>
    </main>
  );
}
