"use client";

import { FormEvent, useState } from "react";
import { BriefcaseBusiness, LoaderCircle } from "lucide-react";
import type { ServicePackage } from "@/lib/cms";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    name: "Name",
    company: "Company",
    email: "Email",
    channel: "Chat / contact channel",
    service: "Service package",
    budget: "Budget",
    timeline: "Timeline",
    goal: "Project details",
    submit: "Send hiring request",
    success: "Request sent. I will review it and contact you before starting.",
    error: "Could not send this hiring request yet.",
  },
  th: {
    name: "ชื่อ",
    company: "บริษัท / หน่วยงาน",
    email: "อีเมล",
    channel: "ช่องทางแชท / ติดต่อ",
    service: "แพ็กเกจบริการ",
    budget: "งบประมาณ",
    timeline: "ระยะเวลา",
    goal: "รายละเอียดงาน",
    submit: "ส่งคำขอจ้างงาน",
    success: "ส่งคำขอแล้ว ผมจะตรวจรายละเอียดและติดต่อกลับก่อนเริ่มงาน",
    error: "ยังส่งคำขอจ้างงานไม่ได้",
  },
  zh: {
    name: "姓名",
    company: "公司 / 机构",
    email: "电子邮件",
    channel: "聊天 / 联系方式",
    service: "服务套餐",
    budget: "预算",
    timeline: "时间安排",
    goal: "项目详情",
    submit: "发送雇佣请求",
    success: "请求已发送。我会先查看详情并联系你。",
    error: "暂时无法发送雇佣请求。",
  },
};

export function HiringRequestForm({
  locale,
  services,
  selectedServiceSlug,
}: {
  locale: Locale;
  services: ServicePackage[];
  selectedServiceSlug?: string;
}) {
  const labels = copy[locale];
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const serviceSlug = String(formData.get("serviceSlug") ?? "");
    const service = services.find((item) => item.slug === serviceSlug);

    const response = await fetch("/api/hiring-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        locale,
        serviceSlug,
        serviceTitle: service?.title ?? serviceSlug,
        name: formData.get("name"),
        company: formData.get("company"),
        email: formData.get("email"),
        contactChannel: formData.get("contactChannel"),
        budget: formData.get("budget"),
        timeline: formData.get("timeline"),
        projectGoal: formData.get("projectGoal"),
      }),
    });

    const payload = (await response.json().catch(() => null)) as { error?: string } | null;

    if (!response.ok) {
      setStatus("error");
      setMessage(payload?.error ?? labels.error);
      return;
    }

    form.reset();
    setStatus("success");
    setMessage(labels.success);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="field-label">
          {labels.name}
          <input className="field-input" name="name" required />
        </label>
        <label className="field-label">
          {labels.company}
          <input className="field-input" name="company" />
        </label>
        <label className="field-label">
          {labels.email}
          <input className="field-input" name="email" type="email" />
        </label>
        <label className="field-label">
          {labels.channel}
          <input className="field-input" name="contactChannel" placeholder="LINE / WhatsApp / Email" />
        </label>
        <label className="field-label">
          {labels.service}
          <select className="field-input" name="serviceSlug" defaultValue={selectedServiceSlug ?? services[0]?.slug}>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title}
              </option>
            ))}
          </select>
        </label>
        <label className="field-label">
          {labels.budget}
          <input className="field-input" name="budget" placeholder="$1k - $3k" />
        </label>
        <label className="field-label md:col-span-2">
          {labels.timeline}
          <input className="field-input" name="timeline" placeholder="2-4 weeks / flexible" />
        </label>
        <label className="field-label md:col-span-2">
          {labels.goal}
          <textarea className="field-input min-h-36 resize-y" name="projectGoal" required />
        </label>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button className="primary-action" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? <LoaderCircle className="animate-spin" size={18} /> : <BriefcaseBusiness size={18} />}
          {labels.submit}
        </button>
        {message ? (
          <p className={status === "error" ? "text-sm font-semibold text-red-700" : "text-sm font-semibold text-emerald-700"}>
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
