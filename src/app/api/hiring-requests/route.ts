import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase-admin";
import { isLocale, type Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

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
      { error: "Hiring request storage is not configured yet." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const locale = isLocale(String(body.locale)) ? (String(body.locale) as Locale) : "en";
  const serviceSlug = cleanText(body.serviceSlug, 120) || null;
  const serviceTitle = cleanText(body.serviceTitle, 160) || null;
  const name = cleanText(body.name, 100);
  const company = cleanText(body.company, 140) || null;
  const email = cleanEmail(body.email);
  const contactChannel = cleanText(body.contactChannel, 140) || null;
  const budget = cleanText(body.budget, 80) || null;
  const timeline = cleanText(body.timeline, 120) || null;
  const projectGoal = cleanText(body.projectGoal, 1600);

  if (name.length < 2 || projectGoal.length < 12) {
    return NextResponse.json(
      { error: "Name and project details are required." },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("hiring_requests")
    .insert({
      locale,
      service_slug: serviceSlug,
      service_title: serviceTitle,
      name,
      company,
      email,
      contact_channel: contactChannel,
      budget,
      timeline,
      project_goal: projectGoal,
      status: "new",
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ request: data }, { status: 201 });
}
