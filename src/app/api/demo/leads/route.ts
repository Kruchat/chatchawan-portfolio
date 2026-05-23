import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

const allowedServices = new Set([
  "AI chatbot",
  "Booking system",
  "Dashboard",
  "API integration",
]);

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function cleanEmail(value: unknown) {
  const email = cleanText(value, 120);
  if (!email) {
    return null;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not configured for this deployment." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = cleanText(body.name, 80);
  const company = cleanText(body.company, 120);
  const service = cleanText(body.service, 40);
  const budget = cleanText(body.budget, 40) || "Discovery";
  const notes = cleanText(body.notes, 240);
  const email = cleanEmail(body.email);

  if (name.length < 2 || company.length < 2 || !allowedServices.has(service)) {
    return NextResponse.json(
      { error: "Name, company, and a valid service are required." },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdmin();
  const priority = budget.includes("$1k") || budget.includes("$3k") ? 5 : 3;

  const { data, error } = await supabase
    .from("demo_leads")
    .insert({
      name,
      company,
      email,
      service,
      budget,
      notes,
      priority,
      status: "new",
      source: "portfolio_demo",
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await supabase.from("demo_events").insert({
    event_type: "lead_created",
    message: `${company} requested a ${service} demo from the portfolio site.`,
  });

  return NextResponse.json({ lead: data }, { status: 201 });
}
