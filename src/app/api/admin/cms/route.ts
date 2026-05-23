import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  contactStatuses,
  defaultSettings,
  getSiteContent,
  requestStatuses,
  type SiteContent,
} from "@/lib/cms";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase-admin";
import { isLocale, type Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

function cleanText(value: FormDataEntryValue | null, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function cleanTextarea(value: FormDataEntryValue | null, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function parseLines(value: FormDataEntryValue | null, maxLength = 140) {
  if (typeof value !== "string") {
    return [];
  }

  return value
    .split("\n")
    .map((line) => line.trim().replace(/\s+/g, " ").slice(0, maxLength))
    .filter(Boolean);
}

function parseProofPoints(value: FormDataEntryValue | null, fallback: SiteContent["home"]["proofPoints"]) {
  const lines = parseLines(value, 180);
  const proofPoints = lines
    .map((line) => {
      const [valuePart, labelPart] = line.split("|").map((part) => part?.trim());
      return valuePart && labelPart ? { value: valuePart, label: labelPart } : null;
    })
    .filter((item): item is { value: string; label: string } => Boolean(item));

  return proofPoints.length ? proofPoints : fallback;
}

function cleanSlug(value: FormDataEntryValue | null) {
  return cleanText(value, 120)
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function cleanNumber(value: FormDataEntryValue | null, fallback: number) {
  const parsed = Number(cleanText(value, 12));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function redirectBack(request: NextRequest, status: "saved" | "error" = "saved") {
  const url = new URL("/admin", request.url);
  url.searchParams.set(status, "1");
  return NextResponse.redirect(url, { status: 303 });
}

function revalidatePublicPages() {
  ["/", "/about", "/services", "/en", "/th", "/zh", "/th/about", "/zh/about", "/th/services", "/zh/services"].forEach((path) => {
    revalidatePath(path);
  });
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return redirectBack(request, "error");
  }

  const formData = await request.formData();
  const intent = cleanText(formData.get("intent"), 60);
  const supabase = getSupabaseAdmin();

  if (intent === "settings") {
    const settings = {
      email: cleanText(formData.get("email"), 160) || defaultSettings.email,
      lineUrl: cleanText(formData.get("lineUrl"), 240),
      whatsappUrl: cleanText(formData.get("whatsappUrl"), 240),
      messengerUrl: cleanText(formData.get("messengerUrl"), 240),
      responseNote: cleanTextarea(formData.get("responseNote"), 400) || defaultSettings.responseNote,
    };

    await supabase.from("site_settings").upsert({
      id: "default",
      settings,
      updated_at: new Date().toISOString(),
    });
    revalidatePublicPages();
    return redirectBack(request);
  }

  if (intent === "site_content") {
    const rawLocale = cleanText(formData.get("locale"), 8);
    const locale = isLocale(rawLocale) ? (rawLocale as Locale) : "en";
    const current = await getSiteContent(locale);
    const content: SiteContent = {
      ...current,
      home: {
        ...current.home,
        eyebrow: cleanText(formData.get("homeEyebrow"), 180) || current.home.eyebrow,
        title: cleanText(formData.get("homeTitle"), 220) || current.home.title,
        body: cleanTextarea(formData.get("homeBody"), 700) || current.home.body,
        primaryCta: cleanText(formData.get("primaryCta"), 80) || current.home.primaryCta,
        secondaryCta: cleanText(formData.get("secondaryCta"), 80) || current.home.secondaryCta,
        proofPoints: parseProofPoints(formData.get("proofPoints"), current.home.proofPoints),
      },
      about: {
        ...current.about,
        eyebrow: cleanText(formData.get("aboutEyebrow"), 180) || current.about.eyebrow,
        title: cleanText(formData.get("aboutTitle"), 220) || current.about.title,
        body: cleanTextarea(formData.get("aboutBody"), 900) || current.about.body,
        experienceTitle: cleanText(formData.get("experienceTitle"), 120) || current.about.experienceTitle,
        experience: parseLines(formData.get("experience"), 220),
        skillsTitle: cleanText(formData.get("skillsTitle"), 120) || current.about.skillsTitle,
        skills: parseLines(formData.get("skills"), 80),
        workflowTitle: cleanText(formData.get("workflowTitle"), 120) || current.about.workflowTitle,
        workflow: parseLines(formData.get("workflow"), 180),
        timezone: cleanText(formData.get("timezone"), 120) || current.about.timezone,
      },
      services: {
        ...current.services,
        title: cleanText(formData.get("servicesTitle"), 220) || current.services.title,
        body: cleanTextarea(formData.get("servicesBody"), 600) || current.services.body,
      },
      projects: {
        ...current.projects,
        title: cleanText(formData.get("projectsTitle"), 220) || current.projects.title,
        body: cleanTextarea(formData.get("projectsBody"), 600) || current.projects.body,
      },
      contact: {
        ...current.contact,
        title: cleanText(formData.get("contactTitle"), 220) || current.contact.title,
        body: cleanTextarea(formData.get("contactBody"), 600) || current.contact.body,
      },
      footer: {
        ...current.footer,
        note: cleanText(formData.get("footerNote"), 220) || current.footer.note,
      },
    };

    await supabase.from("site_content").upsert({
      locale,
      content,
      updated_at: new Date().toISOString(),
    });
    revalidatePublicPages();
    return redirectBack(request);
  }

  if (intent === "service") {
    const rawLocale = cleanText(formData.get("locale"), 8);
    const locale = isLocale(rawLocale) ? (rawLocale as Locale) : "en";
    const slug = cleanSlug(formData.get("slug"));

    if (!slug) {
      return redirectBack(request, "error");
    }

    const payload = {
      slug,
      locale,
      title: cleanText(formData.get("title"), 180),
      summary: cleanTextarea(formData.get("summary"), 500),
      description: cleanTextarea(formData.get("description"), 1000),
      price_from: cleanText(formData.get("priceFrom"), 80),
      timeline: cleanText(formData.get("timeline"), 120),
      features: parseLines(formData.get("features"), 140),
      deliverables: parseLines(formData.get("deliverables"), 140),
      is_active: formData.get("isActive") === "on",
      sort_order: cleanNumber(formData.get("sortOrder"), 10),
      updated_at: new Date().toISOString(),
    };

    const id = cleanText(formData.get("id"), 80);
    if (id) {
      await supabase.from("service_packages").update(payload).eq("id", id);
    } else {
      await supabase.from("service_packages").upsert(payload, { onConflict: "slug,locale" });
    }
    revalidatePublicPages();
    return redirectBack(request);
  }

  if (intent === "project") {
    const rawLocale = cleanText(formData.get("locale"), 8);
    const locale = isLocale(rawLocale) ? (rawLocale as Locale) : "en";
    const slug = cleanSlug(formData.get("slug"));

    if (!slug) {
      return redirectBack(request, "error");
    }

    const payload = {
      slug,
      locale,
      title: cleanText(formData.get("title"), 180),
      type: cleanText(formData.get("type"), 120),
      summary: cleanTextarea(formData.get("summary"), 700),
      href: cleanText(formData.get("href"), 240) || "/projects/ai-service-crm",
      tags: parseLines(formData.get("tags"), 80),
      is_active: formData.get("isActive") === "on",
      sort_order: cleanNumber(formData.get("sortOrder"), 10),
      updated_at: new Date().toISOString(),
    };

    const id = cleanText(formData.get("id"), 80);
    if (id) {
      await supabase.from("portfolio_projects").update(payload).eq("id", id);
    } else {
      await supabase.from("portfolio_projects").upsert(payload, { onConflict: "slug,locale" });
    }
    revalidatePublicPages();
    return redirectBack(request);
  }

  if (intent === "request_status") {
    const id = cleanText(formData.get("id"), 80);
    const status = cleanText(formData.get("status"), 40);

    if (id && requestStatuses.includes(status as (typeof requestStatuses)[number])) {
      await supabase.from("hiring_requests").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    }

    return redirectBack(request);
  }

  if (intent === "contact_status") {
    const id = cleanText(formData.get("id"), 80);
    const status = cleanText(formData.get("status"), 40);

    if (id && contactStatuses.includes(status as (typeof contactStatuses)[number])) {
      await supabase.from("contact_messages").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    }

    return redirectBack(request);
  }

  return redirectBack(request, "error");
}
