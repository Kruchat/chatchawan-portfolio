"use client";

import { FormEvent, useState } from "react";
import { LoaderCircle, Send } from "lucide-react";

const services = ["AI chatbot", "Booking system", "Dashboard", "API integration"];
const budgets = ["Discovery", "$500 - $1k", "$1k - $3k", "$3k+"];

export function DemoLeadForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/demo/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        company: formData.get("company"),
        email: formData.get("email"),
        service: formData.get("service"),
        budget: formData.get("budget"),
        notes: formData.get("notes"),
      }),
    });

    const payload = (await response.json().catch(() => null)) as { error?: string } | null;

    if (!response.ok) {
      setStatus("error");
      setMessage(payload?.error ?? "Could not create the demo lead.");
      return;
    }

    form.reset();
    setStatus("success");
    setMessage("Lead saved to Supabase. Refreshing the live dashboard...");
    window.setTimeout(() => window.location.reload(), 900);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-md border border-[#17130d]/10 bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="field-label">
          Name
          <input className="field-input" name="name" placeholder="Anna Miller" required />
        </label>
        <label className="field-label">
          Company
          <input className="field-input" name="company" placeholder="Travel Ops Studio" required />
        </label>
        <label className="field-label">
          Email
          <input className="field-input" name="email" placeholder="client@example.com" type="email" />
        </label>
        <label className="field-label">
          Service
          <select className="field-input" name="service" defaultValue="Booking system">
            {services.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
        </label>
        <label className="field-label">
          Budget
          <select className="field-input" name="budget" defaultValue="$1k - $3k">
            {budgets.map((budget) => (
              <option key={budget}>{budget}</option>
            ))}
          </select>
        </label>
        <label className="field-label md:col-span-2">
          Notes
          <textarea
            className="field-input min-h-28 resize-y"
            name="notes"
            placeholder="Needs a booking dashboard with pickup management and invoice flow."
          />
        </label>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button className="primary-action" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <LoaderCircle className="animate-spin" size={18} />
          ) : (
            <Send size={18} />
          )}
          Save demo lead
        </button>
        {message ? (
          <p className={status === "error" ? "text-sm font-medium text-red-700" : "text-sm font-medium text-emerald-700"}>
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
