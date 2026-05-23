"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  Activity,
  Bot,
  CheckCircle2,
  Database,
  LoaderCircle,
  Send,
  Sparkles,
} from "lucide-react";
import type { ProjectClientCopy } from "@/lib/i18n";
import type { DemoLead, DemoOverview } from "@/lib/demo-backoffice";

type ProjectForm = {
  name: string;
  company: string;
  email: string;
  industry: string;
  goal: string;
  channel: string;
  budget: string;
  urgency: string;
};

const initialForm: ProjectForm = {
  name: "Sarah Chen",
  company: "Northstar Travel Co.",
  email: "sarah@example.com",
  industry: "Travel agency",
  goal: "We need an AI assistant that answers common questions, captures trip requests, and sends qualified leads to our team.",
  channel: "Website chatbot + CRM",
  budget: "$1k - $3k",
  urgency: "Launch MVP in 2 weeks",
};

function toService(channel: string): DemoLead["service"] {
  if (channel.includes("chatbot") || channel.includes("LINE")) {
    return "AI chatbot";
  }

  if (channel.includes("Booking")) {
    return "Booking system";
  }

  if (channel.includes("reporting")) {
    return "Dashboard";
  }

  return "API integration";
}

function buildScore(form: ProjectForm) {
  let score = 62;

  if (form.budget.includes("$1k") || form.budget.includes("$3k")) {
    score += 18;
  }

  if (form.urgency.includes("2 weeks") || form.urgency.includes("Fix")) {
    score += 10;
  }

  if (form.goal.length > 90) {
    score += 8;
  }

  return Math.min(score, 98);
}

function buildPlan(form: ProjectForm, copy: ProjectClientCopy) {
  const service = toService(form.channel);

  if (service === "AI chatbot") {
    return copy.plans.aiChatbot;
  }

  if (service === "Booking system") {
    return copy.plans.bookingSystem;
  }

  if (service === "Dashboard") {
    return copy.plans.dashboard;
  }

  return copy.plans.apiIntegration;
}

function renderTemplate(template: string, values: Record<string, string | number>) {
  return Object.entries(values).reduce(
    (output, [key, value]) => output.replaceAll(`{{${key}}}`, String(value)),
    template,
  );
}

export function AiServiceCrmProject({
  initialOverview,
  copy,
}: {
  initialOverview: DemoOverview;
  copy: ProjectClientCopy;
}) {
  const [form, setForm] = useState<ProjectForm>(initialForm);
  const [overview, setOverview] = useState(initialOverview);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const leadScore = useMemo(() => buildScore(form), [form]);
  const plan = useMemo(() => buildPlan(form, copy), [copy, form]);
  const service = toService(form.channel);
  const liveLeads = overview.leads.slice(0, 5);
  const suggestedMilestone = copy.lowercaseSuggestedMilestone ? plan[0].toLowerCase() : plan[0];

  function updateField(field: keyof ProjectForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function refreshOverview() {
    const response = await fetch("/api/demo/overview", { cache: "no-store" });
    const payload = (await response.json()) as DemoOverview;
    setOverview(payload);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const notes = [
      `Industry: ${form.industry}`,
      `Channel: ${form.channel}`,
      `Urgency: ${form.urgency}`,
      `Goal: ${form.goal}`,
      `AI qualification score: ${leadScore}/100`,
      `Suggested first milestone: ${plan[0]}`,
    ].join(" | ");

    const response = await fetch("/api/demo/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        company: form.company,
        email: form.email,
        service,
        budget: form.budget,
        notes,
      }),
    });

    const payload = (await response.json().catch(() => null)) as { error?: string } | null;

    if (!response.ok) {
      setStatus("error");
      setMessage(payload?.error ?? copy.errorMessage);
      return;
    }

    await refreshOverview();
    setStatus("success");
    setMessage(copy.successMessage);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-md border border-[#17130d]/10 bg-white shadow-sm">
        <div className="border-b border-[#17130d]/10 p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="eyebrow">{copy.customerPlayground}</p>
              <h2 className="mt-2 text-3xl font-semibold leading-tight">
                {copy.tryWorkflow}
              </h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-md bg-[#17130d] px-3 py-2 font-mono text-sm font-semibold text-[#f7f5ef]">
              <Database size={16} />
              {overview.configured && !overview.error ? copy.liveDatabase : copy.demoMode}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="field-label">
              {copy.contactName}
              <input
                className="field-input"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                required
              />
            </label>
            <label className="field-label">
              {copy.company}
              <input
                className="field-input"
                value={form.company}
                onChange={(event) => updateField("company", event.target.value)}
                required
              />
            </label>
            <label className="field-label">
              {copy.email}
              <input
                className="field-input"
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
              />
            </label>
            <label className="field-label">
              {copy.industry}
              <select
                className="field-input"
                value={form.industry}
                onChange={(event) => updateField("industry", event.target.value)}
              >
                {copy.industries.map((industry) => (
                  <option key={industry.value} value={industry.value}>
                    {industry.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="field-label">
              {copy.workflow}
              <select
                className="field-input"
                value={form.channel}
                onChange={(event) => updateField("channel", event.target.value)}
              >
                {copy.channels.map((channel) => (
                  <option key={channel.value} value={channel.value}>
                    {channel.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="field-label">
              {copy.budget}
              <select
                className="field-input"
                value={form.budget}
                onChange={(event) => updateField("budget", event.target.value)}
              >
                {copy.budgets.map((budget) => (
                  <option key={budget.value} value={budget.value}>
                    {budget.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="field-label md:col-span-2">
              {copy.projectGoal}
              <textarea
                className="field-input min-h-32 resize-y"
                value={form.goal}
                onChange={(event) => updateField("goal", event.target.value)}
                required
              />
            </label>
            <label className="field-label md:col-span-2">
              {copy.timing}
              <select
                className="field-input"
                value={form.urgency}
                onChange={(event) => updateField("urgency", event.target.value)}
              >
                {copy.urgencies.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="rounded-md border border-[#17130d]/10 bg-[#f7f5ef] p-4">
            <div className="flex items-start gap-3">
              <Bot className="mt-1 text-[#0f766e]" size={22} />
              <div>
                <p className="font-mono text-xs font-semibold uppercase text-[#7a6c5d]">
                  {copy.aiQualification}
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {renderTemplate(copy.leadScoreTemplate, { service, score: leadScore })}
                </p>
                <p className="mt-2 leading-7 text-[#5a5044]">
                  {renderTemplate(copy.suggestedFirstMilestoneTemplate, {
                    milestone: suggestedMilestone,
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button className="primary-action" type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? (
                <LoaderCircle className="animate-spin" size={18} />
              ) : (
                <Send size={18} />
              )}
              {copy.saveToCrm}
            </button>
            {message ? (
              <p
                className={
                  status === "error"
                    ? "text-sm font-semibold text-red-700"
                    : "text-sm font-semibold text-emerald-700"
                }
              >
                {message}
              </p>
            ) : null}
          </div>
        </form>
      </section>

      <section className="space-y-6">
        <div className="rounded-md border border-[#17130d]/10 bg-[#17130d] p-5 text-[#f7f5ef] shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow text-[#f6c453]">{copy.generatedPlan}</p>
              <h2 className="mt-2 text-3xl font-semibold">{copy.whatClientSees}</h2>
            </div>
            <Sparkles className="text-[#2dd4bf]" />
          </div>
          <div className="mt-6 grid gap-3">
            {plan.map((item, index) => (
              <div className="flex items-start gap-3 rounded-md bg-white/10 p-3" key={item}>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[#f6c453] font-mono text-xs font-bold text-[#17130d]">
                  {index + 1}
                </span>
                <p className="leading-6 text-[#efe7db]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Metric label={copy.liveLeads} value={overview.stats.totalLeads} />
          <Metric label={copy.hotLeads} value={overview.stats.hotLeads} />
          <Metric label={copy.openTasks} value={overview.stats.openTasks} />
        </div>

        <div className="rounded-md border border-[#17130d]/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="eyebrow">{copy.operationsFeed}</p>
              <h2 className="mt-2 text-2xl font-semibold">{copy.latestRecords}</h2>
            </div>
            <Activity className="text-[#0f766e]" />
          </div>
          <div className="mt-5 space-y-3">
            {liveLeads.map((lead) => (
              <div className="rounded-md border border-[#17130d]/10 bg-[#f7f5ef] p-4" key={lead.id}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{lead.company}</p>
                    <p className="mt-1 text-sm text-[#6d6255]">{lead.name}</p>
                  </div>
                  <span className="tech-chip">{lead.service}</span>
                </div>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#5a5044]">
                  {lead.notes || copy.fallbackNote}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-[#17130d]/10 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 text-emerald-700" />
            <p className="leading-7 text-[#5a5044]">
              {copy.proofNote}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-[#17130d]/10 bg-white p-4 shadow-sm">
      <p className="font-mono text-xs font-bold uppercase text-[#7a6c5d]">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  );
}
