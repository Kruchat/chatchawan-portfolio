"use client";

import { FormEvent, useState } from "react";
import { LoaderCircle, Send } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    name: "Name",
    company: "Company",
    email: "Email",
    channel: "Preferred chat / contact",
    message: "Message",
    submit: "Send message",
    success: "Message sent. I will reply through your preferred channel.",
    error: "Could not send this message yet.",
  },
  th: {
    name: "ชื่อ",
    company: "บริษัท / หน่วยงาน",
    email: "อีเมล",
    channel: "ช่องทางติดต่อที่สะดวก",
    message: "ข้อความ",
    submit: "ส่งข้อความ",
    success: "ส่งข้อความแล้ว ผมจะติดต่อกลับผ่านช่องทางที่คุณสะดวก",
    error: "ยังส่งข้อความไม่ได้",
  },
  zh: {
    name: "姓名",
    company: "公司 / 机构",
    email: "电子邮件",
    channel: "首选联系方式",
    message: "消息",
    submit: "发送消息",
    success: "消息已发送。我会通过你选择的渠道回复。",
    error: "暂时无法发送消息。",
  },
};

export function ContactForm({ locale }: { locale: Locale }) {
  const labels = copy[locale];
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        locale,
        name: formData.get("name"),
        company: formData.get("company"),
        email: formData.get("email"),
        channel: formData.get("channel"),
        message: formData.get("message"),
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
          <input className="field-input" name="channel" placeholder="LINE / WhatsApp / Email" />
        </label>
        <label className="field-label md:col-span-2">
          {labels.message}
          <textarea className="field-input min-h-32 resize-y" name="message" required />
        </label>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button className="primary-action" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? <LoaderCircle className="animate-spin" size={18} /> : <Send size={18} />}
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
