import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase-admin";
import { homeCopies, type Locale } from "@/lib/i18n";

export type SiteSettings = {
  email: string;
  lineUrl: string;
  whatsappUrl: string;
  messengerUrl: string;
  responseNote: string;
};

export type SiteContent = {
  nav: {
    home: string;
    about: string;
    services: string;
    projects: string;
    contact: string;
    hire: string;
  };
  home: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    proofPoints: Array<{ value: string; label: string }>;
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    experienceTitle: string;
    experience: string[];
    skillsTitle: string;
    skills: string[];
    workflowTitle: string;
    workflow: string[];
    timezone: string;
  };
  services: {
    eyebrow: string;
    title: string;
    body: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    body: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    formTitle: string;
    chatTitle: string;
  };
  footer: {
    note: string;
  };
};

export type ServicePackage = {
  id?: string;
  slug: string;
  locale: Locale;
  title: string;
  summary: string;
  description: string;
  priceFrom: string;
  timeline: string;
  features: string[];
  deliverables: string[];
  isActive: boolean;
  sortOrder: number;
};

export type PortfolioProject = {
  id?: string;
  slug: string;
  locale: Locale;
  title: string;
  type: string;
  summary: string;
  href: string;
  tags: string[];
  isActive: boolean;
  sortOrder: number;
};

export type HiringRequest = {
  id: string;
  service_slug: string | null;
  service_title: string | null;
  name: string;
  company: string | null;
  email: string | null;
  contact_channel: string | null;
  budget: string | null;
  timeline: string | null;
  project_goal: string;
  status: "new" | "contacted" | "quoted" | "in_progress" | "completed" | "cancelled";
  locale: Locale;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  company: string | null;
  email: string | null;
  channel: string | null;
  message: string;
  status: "new" | "replied" | "archived";
  locale: Locale;
  created_at: string;
};

export type PublicSiteData = {
  content: SiteContent;
  settings: SiteSettings;
  services: ServicePackage[];
  projects: PortfolioProject[];
  configured: boolean;
};

export type AdminCmsData = {
  contentByLocale: Record<Locale, SiteContent>;
  settings: SiteSettings;
  services: ServicePackage[];
  projects: PortfolioProject[];
  hiringRequests: HiringRequest[];
  contactMessages: ContactMessage[];
  configured: boolean;
  error?: string;
};

type ServiceRow = {
  id?: string;
  slug: string;
  locale: Locale;
  title: string;
  summary: string;
  description: string;
  price_from: string;
  timeline: string;
  features: string[] | null;
  deliverables: string[] | null;
  is_active: boolean;
  sort_order: number;
};

type ProjectRow = {
  id?: string;
  slug: string;
  locale: Locale;
  title: string;
  type: string;
  summary: string;
  href: string;
  tags: string[] | null;
  is_active: boolean;
  sort_order: number;
};

export const requestStatuses: HiringRequest["status"][] = [
  "new",
  "contacted",
  "quoted",
  "in_progress",
  "completed",
  "cancelled",
];

export const contactStatuses: ContactMessage["status"][] = ["new", "replied", "archived"];

export const defaultSettings: SiteSettings = {
  email: "hello@example.com",
  lineUrl: "",
  whatsappUrl: "",
  messengerUrl: "",
  responseNote: "Usually replies within 1 business day from Asia/Bangkok (UTC+7).",
};

export const defaultContent: Record<Locale, SiteContent> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      projects: "Projects",
      contact: "Contact",
      hire: "Hire me",
    },
    home: {
      eyebrow: "Online systems, AI automation, and portfolio-ready products",
      title: "I build business systems clients can order, test, and run.",
      body:
        "Next.js developer in Thailand building service websites, admin dashboards, booking workflows, AI intake flows, Supabase backends, and online hiring funnels for small teams.",
      primaryCta: "Start a project",
      secondaryCta: "View services",
      proofPoints: [
        { value: "10+", label: "years building business systems" },
        { value: "EN/TH/ZH", label: "localized site content" },
        { value: "UTC+7", label: "async friendly timezone" },
      ],
    },
    about: {
      eyebrow: "Personal profile",
      title: "Programmer focused on practical systems for real operations.",
      body:
        "I help clients turn messy manual work into focused web systems: service pages, lead forms, order requests, admin panels, dashboards, and AI-assisted workflows that can be improved in stages.",
      experienceTitle: "Experience",
      experience: [
        "Built business systems, booking workflows, dashboards, and internal tools for over 10 years.",
        "Comfortable with Next.js App Router, TypeScript, Supabase, Postgres, API integrations, and admin UX.",
        "Good fit for scoped first milestones where clients need a useful PR and clear handoff notes.",
      ],
      skillsTitle: "Core skills",
      skills: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "AI workflows", "Admin dashboards"],
      workflowTitle: "How I work",
      workflow: [
        "Clarify the smallest useful version first",
        "Build the public flow and admin flow together",
        "Keep data ownership and server-side credentials safe",
        "Ship clear notes so the system can keep evolving",
      ],
      timezone: "Asia/Bangkok (UTC+7)",
    },
    services: {
      eyebrow: "Service packages",
      title: "Order a focused online system package.",
      body:
        "Each package starts with a practical v1: public page, request form, database storage, and the admin controls needed to manage the work.",
    },
    projects: {
      eyebrow: "Case studies",
      title: "Realistic examples of systems I can build and maintain.",
      body:
        "These projects show the same building blocks used in client work: App Router pages, forms, Supabase data, API routes, and backoffice screens.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Tell me what you want to build.",
      body:
        "Use the form for a structured request, or open a chat link if you want to discuss the scope first.",
      formTitle: "Send a project message",
      chatTitle: "Chat channels",
    },
    footer: {
      note: "Chatchawan T. - Next.js, AI automation, online services, and business systems.",
    },
  },
  th: {
    nav: {
      home: "หน้าแรก",
      about: "ประวัติ",
      services: "บริการ",
      projects: "ผลงาน",
      contact: "ติดต่อ",
      hire: "จ้างงาน",
    },
    home: {
      eyebrow: "ระบบออนไลน์, AI Automation และเว็บพร้อมหลังบ้าน",
      title: "ผมสร้างระบบธุรกิจที่ลูกค้าสั่งซื้อ ทดลอง และใช้งานจริงได้",
      body:
        "นักพัฒนา Next.js ในประเทศไทย ทำเว็บขายบริการ ระบบหลังบ้าน ระบบจอง ฟอร์มรับงาน ระบบ AI intake, Supabase backend และ workflow สำหรับรับจ้างงานออนไลน์",
      primaryCta: "เริ่มจ้างงาน",
      secondaryCta: "ดูบริการ",
      proofPoints: [
        { value: "10+", label: "ปีในการทำระบบธุรกิจ" },
        { value: "EN/TH/ZH", label: "รองรับหลายภาษา" },
        { value: "UTC+7", label: "ทำงาน async ได้สะดวก" },
      ],
    },
    about: {
      eyebrow: "ประวัติส่วนตัว",
      title: "โปรแกรมเมอร์ที่เน้นระบบใช้งานจริงสำหรับธุรกิจ",
      body:
        "ผมช่วยเปลี่ยนงาน manual ที่กระจัดกระจายให้เป็นระบบเว็บที่ใช้งานได้จริง เช่น หน้าเสนอขายบริการ ฟอร์มรับ lead/order หลังบ้าน Dashboard และ workflow ที่ต่อยอดได้เป็นรอบ ๆ",
      experienceTitle: "ประสบการณ์",
      experience: [
        "พัฒนาระบบธุรกิจ ระบบจอง Dashboard และ internal tools มากกว่า 10 ปี",
        "ถนัด Next.js App Router, TypeScript, Supabase, Postgres, API integration และ admin UX",
        "เหมาะกับงาน milestone ชัดเจน ที่ต้องการส่งมอบงานจริงพร้อม notes",
      ],
      skillsTitle: "ทักษะหลัก",
      skills: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "AI workflows", "Admin dashboards"],
      workflowTitle: "วิธีทำงาน",
      workflow: [
        "สรุป v1 ที่เล็กและคุ้มก่อน",
        "ทำ public flow และ admin flow ไปพร้อมกัน",
        "ดูแลข้อมูลและ server-side credentials ให้ปลอดภัย",
        "ส่ง notes ชัดเจนเพื่อให้ระบบต่อยอดได้",
      ],
      timezone: "Asia/Bangkok (UTC+7)",
    },
    services: {
      eyebrow: "แพ็กเกจบริการ",
      title: "สั่งทำระบบออนไลน์แบบมีขอบเขตชัดเจน",
      body:
        "แต่ละแพ็กเกจเริ่มจาก v1 ที่ใช้ได้จริง: หน้าเว็บ ฟอร์ม ฐานข้อมูล และหลังบ้านสำหรับจัดการข้อมูล",
    },
    projects: {
      eyebrow: "ผลงาน",
      title: "ตัวอย่างระบบที่ผมสร้างและดูแลต่อได้",
      body:
        "ตัวอย่างเหล่านี้ใช้โครงสร้างเดียวกับงานลูกค้า: App Router, form, Supabase, API route และหน้าหลังบ้าน",
    },
    contact: {
      eyebrow: "ติดต่อ",
      title: "เล่าให้ผมฟังว่าคุณอยากสร้างอะไร",
      body:
        "ใช้ฟอร์มเพื่อส่งรายละเอียดงาน หรือเปิดลิงก์แชทถ้าต้องการคุย scope ก่อน",
      formTitle: "ส่งข้อความโปรเจค",
      chatTitle: "ช่องทางแชท",
    },
    footer: {
      note: "Chatchawan T. - Next.js, AI automation, ระบบออนไลน์ และระบบธุรกิจ",
    },
  },
  zh: {
    nav: {
      home: "首页",
      about: "关于",
      services: "服务",
      projects: "项目",
      contact: "联系",
      hire: "雇佣我",
    },
    home: {
      eyebrow: "在线系统、AI 自动化与可管理的网站",
      title: "我开发客户可以下单、测试并真正运营的业务系统",
      body:
        "来自泰国的 Next.js 开发者，专注服务型网站、后台管理、预订流程、AI intake、Supabase 后端，以及在线雇佣流程。",
      primaryCta: "开始项目",
      secondaryCta: "查看服务",
      proofPoints: [
        { value: "10+", label: "业务系统经验" },
        { value: "EN/TH/ZH", label: "多语言内容" },
        { value: "UTC+7", label: "适合异步协作" },
      ],
    },
    about: {
      eyebrow: "个人简介",
      title: "专注为真实运营打造实用系统的程序员",
      body:
        "我帮助客户把零散的人工流程变成清晰的 Web 系统：服务页面、线索表单、订单请求、后台、Dashboard，以及可分阶段优化的 AI 工作流。",
      experienceTitle: "经验",
      experience: [
        "超过 10 年业务系统、预订流程、Dashboard 和内部工具开发经验",
        "熟悉 Next.js App Router、TypeScript、Supabase、Postgres、API 集成与后台 UX",
        "适合范围明确、需要可用 PR 和清晰交接说明的项目",
      ],
      skillsTitle: "核心技能",
      skills: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "AI workflows", "Admin dashboards"],
      workflowTitle: "工作方式",
      workflow: [
        "先确认最小可用版本",
        "同时设计公开流程和后台流程",
        "保护数据所有权和服务端密钥",
        "交付清晰说明，方便继续迭代",
      ],
      timezone: "Asia/Bangkok (UTC+7)",
    },
    services: {
      eyebrow: "服务套餐",
      title: "订购一个范围清晰的在线系统",
      body:
        "每个套餐从实用 v1 开始：公开页面、需求表单、数据库存储，以及管理工作所需的后台控制。",
    },
    projects: {
      eyebrow: "案例",
      title: "我可以构建和维护的系统案例",
      body:
        "这些项目展示客户工作中常用的构建模块：App Router 页面、表单、Supabase 数据、API routes 和后台界面。",
    },
    contact: {
      eyebrow: "联系",
      title: "告诉我你想构建什么",
      body:
        "使用表单提交结构化需求，或打开聊天链接先讨论范围。",
      formTitle: "发送项目消息",
      chatTitle: "聊天渠道",
    },
    footer: {
      note: "Chatchawan T. - Next.js、AI 自动化、在线服务与业务系统",
    },
  },
};

export const defaultServices: Record<Locale, ServicePackage[]> = {
  en: [
    {
      slug: "ai-chatbot-crm",
      locale: "en",
      title: "AI Chatbot + CRM Intake",
      summary: "Capture leads, qualify requests, and store customer notes in a real CRM workflow.",
      description:
        "A practical AI intake system for service teams that need website leads, handoff notes, and a simple admin review flow.",
      priceFrom: "$900",
      timeline: "2-3 weeks",
      features: ["Website intake flow", "AI-style qualification", "Supabase lead storage", "Admin review dashboard"],
      deliverables: ["Next.js pages", "API route", "Supabase schema", "Deployment notes"],
      isActive: true,
      sortOrder: 1,
    },
    {
      slug: "booking-dashboard",
      locale: "en",
      title: "Booking System + Admin Dashboard",
      summary: "A booking request flow with status tracking, activity history, and admin management.",
      description:
        "Built for tours, schools, clinics, and service teams that need structured booking requests and a clear operations view.",
      priceFrom: "$1,200",
      timeline: "3-4 weeks",
      features: ["Booking request form", "Status model", "Task/activity feed", "Responsive admin dashboard"],
      deliverables: ["Public booking flow", "Admin screens", "Database tables", "Testing checklist"],
      isActive: true,
      sortOrder: 2,
    },
    {
      slug: "portfolio-commerce-cms",
      locale: "en",
      title: "Portfolio + Online Hiring CMS",
      summary: "A service website where clients can browse packages, submit hiring requests, and contact you.",
      description:
        "A full portfolio sales system with editable content, service packages, project case studies, contact forms, and admin controls.",
      priceFrom: "$1,500",
      timeline: "3-5 weeks",
      features: ["Editable content", "Service package catalog", "Hiring request form", "Admin CMS"],
      deliverables: ["Public website", "Admin backoffice", "Supabase tables", "Handoff guide"],
      isActive: true,
      sortOrder: 3,
    },
  ],
  th: [
    {
      slug: "ai-chatbot-crm",
      locale: "th",
      title: "AI Chatbot + ระบบรับ Lead เข้า CRM",
      summary: "รับ lead คัดกรองคำขอ และเก็บ notes ลูกค้าใน workflow จริง",
      description:
        "ระบบ AI intake สำหรับทีมบริการที่ต้องการรับ lead จากเว็บ มี notes สำหรับส่งต่อ และหน้าหลังบ้านสำหรับตรวจสอบ",
      priceFrom: "$900",
      timeline: "2-3 สัปดาห์",
      features: ["ฟอร์มรับบรีฟบนเว็บ", "คัดกรองแบบ AI-style", "เก็บ lead ใน Supabase", "Dashboard ให้แอดมินตรวจ"],
      deliverables: ["หน้า Next.js", "API route", "Supabase schema", "notes สำหรับ deploy"],
      isActive: true,
      sortOrder: 1,
    },
    {
      slug: "booking-dashboard",
      locale: "th",
      title: "ระบบจอง + Admin Dashboard",
      summary: "ระบบรับคำขอจอง พร้อมสถานะงาน ประวัติกิจกรรม และหลังบ้านจัดการข้อมูล",
      description:
        "เหมาะกับทัวร์ โรงเรียน คลินิก และทีมบริการที่ต้องการรับ booking request แบบเป็นระบบ",
      priceFrom: "$1,200",
      timeline: "3-4 สัปดาห์",
      features: ["ฟอร์มจอง", "ระบบสถานะ", "Task/activity feed", "Dashboard responsive"],
      deliverables: ["Public booking flow", "หน้าหลังบ้าน", "ตารางฐานข้อมูล", "testing checklist"],
      isActive: true,
      sortOrder: 2,
    },
    {
      slug: "portfolio-commerce-cms",
      locale: "th",
      title: "Portfolio + ระบบรับจ้างงานออนไลน์",
      summary: "เว็บขายบริการที่ลูกค้าดูแพ็กเกจ ส่งคำขอจ้างงาน และติดต่อคุณได้",
      description:
        "ระบบ portfolio สำหรับขายบริการ พร้อมแก้เนื้อหาได้ จัดการแพ็กเกจ ผลงาน ฟอร์มติดต่อ และหลังบ้าน",
      priceFrom: "$1,500",
      timeline: "3-5 สัปดาห์",
      features: ["แก้เนื้อหาได้", "ประกาศขายแพ็กเกจ", "ฟอร์มจ้างงาน", "Admin CMS"],
      deliverables: ["เว็บไซต์ public", "หลังบ้าน", "ตาราง Supabase", "คู่มือส่งมอบ"],
      isActive: true,
      sortOrder: 3,
    },
  ],
  zh: [
    {
      slug: "ai-chatbot-crm",
      locale: "zh",
      title: "AI Chatbot + CRM Intake",
      summary: "收集线索、评估需求，并把客户备注保存到 CRM 流程中。",
      description:
        "适合服务团队的 AI intake 系统：网站线索、交接备注，以及简单的后台审核流程。",
      priceFrom: "$900",
      timeline: "2-3 周",
      features: ["网站 intake 流程", "AI 式评估", "Supabase 线索存储", "后台审核 Dashboard"],
      deliverables: ["Next.js 页面", "API route", "Supabase schema", "部署说明"],
      isActive: true,
      sortOrder: 1,
    },
    {
      slug: "booking-dashboard",
      locale: "zh",
      title: "预订系统 + 后台 Dashboard",
      summary: "预订请求流程，包含状态跟踪、活动历史和后台管理。",
      description:
        "适合旅游、学校、诊所和服务团队，需要结构化预订请求和清晰运营视图。",
      priceFrom: "$1,200",
      timeline: "3-4 周",
      features: ["预订请求表单", "状态模型", "任务/活动 feed", "响应式后台"],
      deliverables: ["公开预订流程", "后台页面", "数据库表", "测试清单"],
      isActive: true,
      sortOrder: 2,
    },
    {
      slug: "portfolio-commerce-cms",
      locale: "zh",
      title: "作品集 + 在线雇佣 CMS",
      summary: "客户可浏览服务套餐、提交雇佣请求并联系你的服务网站。",
      description:
        "完整的作品集销售系统，包含可编辑内容、服务套餐、案例、联系表单和后台控制。",
      priceFrom: "$1,500",
      timeline: "3-5 周",
      features: ["可编辑内容", "服务套餐目录", "雇佣请求表单", "Admin CMS"],
      deliverables: ["公开网站", "后台系统", "Supabase 表", "交接指南"],
      isActive: true,
      sortOrder: 3,
    },
  ],
};

export const defaultProjects: Record<Locale, PortfolioProject[]> = {
  en: homeCopies.en.work.projects.map((project, index) => ({
    slug: project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    locale: "en",
    title: project.name,
    type: project.type,
    summary: project.summary,
    href: project.href,
    tags: project.tags,
    isActive: true,
    sortOrder: index + 1,
  })),
  th: homeCopies.th.work.projects.map((project, index) => ({
    slug: project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    locale: "th",
    title: project.name,
    type: project.type,
    summary: project.summary,
    href: project.href,
    tags: project.tags,
    isActive: true,
    sortOrder: index + 1,
  })),
  zh: homeCopies.zh.work.projects.map((project, index) => ({
    slug: project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    locale: "zh",
    title: project.name,
    type: project.type,
    summary: project.summary,
    href: project.href,
    tags: project.tags,
    isActive: true,
    sortOrder: index + 1,
  })),
};

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mergeDeep<T>(fallback: T, value: unknown): T {
  if (!isObject(fallback) || !isObject(value)) {
    return (value === undefined || value === null ? fallback : value) as T;
  }

  const output: Record<string, unknown> = { ...fallback };

  for (const [key, nextValue] of Object.entries(value)) {
    const fallbackValue = (fallback as Record<string, unknown>)[key];
    output[key] = mergeDeep(fallbackValue, nextValue);
  }

  return output as T;
}

function toStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function serviceFromRow(row: ServiceRow): ServicePackage {
  return {
    id: row.id,
    slug: row.slug,
    locale: row.locale,
    title: row.title,
    summary: row.summary,
    description: row.description,
    priceFrom: row.price_from,
    timeline: row.timeline,
    features: toStringArray(row.features),
    deliverables: toStringArray(row.deliverables),
    isActive: row.is_active,
    sortOrder: row.sort_order,
  };
}

function projectFromRow(row: ProjectRow): PortfolioProject {
  return {
    id: row.id,
    slug: row.slug,
    locale: row.locale,
    title: row.title,
    type: row.type,
    summary: row.summary,
    href: row.href,
    tags: toStringArray(row.tags),
    isActive: row.is_active,
    sortOrder: row.sort_order,
  };
}

async function safeQuery<T>(query: PromiseLike<{ data: T | null; error: { message: string } | null }>) {
  try {
    const result = await query;
    return result.error ? null : result.data;
  } catch {
    return null;
  }
}

export async function getSiteContent(locale: Locale): Promise<SiteContent> {
  const fallback = defaultContent[locale];

  if (!isSupabaseConfigured()) {
    return fallback;
  }

  const supabase = getSupabaseAdmin();
  const data = await safeQuery<{ content: unknown }>(
    supabase.from("site_content").select("content").eq("locale", locale).maybeSingle(),
  );

  return mergeDeep(fallback, data?.content);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured()) {
    return defaultSettings;
  }

  const supabase = getSupabaseAdmin();
  const data = await safeQuery<{ settings: unknown }>(
    supabase.from("site_settings").select("settings").eq("id", "default").maybeSingle(),
  );

  return mergeDeep(defaultSettings, data?.settings);
}

export async function getServicePackages(
  locale: Locale,
  options: { includeInactive?: boolean } = {},
): Promise<ServicePackage[]> {
  if (!isSupabaseConfigured()) {
    return defaultServices[locale].filter((service) => options.includeInactive || service.isActive);
  }

  const supabase = getSupabaseAdmin();
  let query = supabase
    .from("service_packages")
    .select("*")
    .eq("locale", locale)
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  if (!options.includeInactive) {
    query = query.eq("is_active", true);
  }

  const rows = await safeQuery<ServiceRow[]>(query);
  const services = rows?.map(serviceFromRow) ?? [];

  return services.length ? services : defaultServices[locale].filter((service) => options.includeInactive || service.isActive);
}

export async function getServicePackage(locale: Locale, slug: string) {
  const services = await getServicePackages(locale, { includeInactive: false });
  return services.find((service) => service.slug === slug) ?? null;
}

export async function getPortfolioProjects(
  locale: Locale,
  options: { includeInactive?: boolean } = {},
): Promise<PortfolioProject[]> {
  if (!isSupabaseConfigured()) {
    return defaultProjects[locale].filter((project) => options.includeInactive || project.isActive);
  }

  const supabase = getSupabaseAdmin();
  let query = supabase
    .from("portfolio_projects")
    .select("*")
    .eq("locale", locale)
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  if (!options.includeInactive) {
    query = query.eq("is_active", true);
  }

  const rows = await safeQuery<ProjectRow[]>(query);
  const projects = rows?.map(projectFromRow) ?? [];

  return projects.length ? projects : defaultProjects[locale].filter((project) => options.includeInactive || project.isActive);
}

export async function getPublicSiteData(locale: Locale): Promise<PublicSiteData> {
  const [content, settings, services, projects] = await Promise.all([
    getSiteContent(locale),
    getSiteSettings(),
    getServicePackages(locale),
    getPortfolioProjects(locale),
  ]);

  return {
    content,
    settings,
    services,
    projects,
    configured: isSupabaseConfigured(),
  };
}

async function getAllServicesForAdmin(): Promise<ServicePackage[]> {
  const fallback = Object.values(defaultServices).flat();

  if (!isSupabaseConfigured()) {
    return fallback;
  }

  const supabase = getSupabaseAdmin();
  const rows = await safeQuery<ServiceRow[]>(
    supabase
      .from("service_packages")
      .select("*")
      .order("locale", { ascending: true })
      .order("sort_order", { ascending: true })
      .order("title", { ascending: true }),
  );

  return rows?.length ? rows.map(serviceFromRow) : fallback;
}

async function getAllProjectsForAdmin(): Promise<PortfolioProject[]> {
  const fallback = Object.values(defaultProjects).flat();

  if (!isSupabaseConfigured()) {
    return fallback;
  }

  const supabase = getSupabaseAdmin();
  const rows = await safeQuery<ProjectRow[]>(
    supabase
      .from("portfolio_projects")
      .select("*")
      .order("locale", { ascending: true })
      .order("sort_order", { ascending: true })
      .order("title", { ascending: true }),
  );

  return rows?.length ? rows.map(projectFromRow) : fallback;
}

export async function getAdminCmsData(): Promise<AdminCmsData> {
  const contentByLocale = {
    en: await getSiteContent("en"),
    th: await getSiteContent("th"),
    zh: await getSiteContent("zh"),
  };

  if (!isSupabaseConfigured()) {
    return {
      contentByLocale,
      settings: defaultSettings,
      services: Object.values(defaultServices).flat(),
      projects: Object.values(defaultProjects).flat(),
      hiringRequests: [],
      contactMessages: [],
      configured: false,
      error: "Supabase is not configured. CMS changes will be available after env vars and migrations are applied.",
    };
  }

  const supabase = getSupabaseAdmin();
  const [settings, services, projects, hiringRequests, contactMessages] = await Promise.all([
    getSiteSettings(),
    getAllServicesForAdmin(),
    getAllProjectsForAdmin(),
    safeQuery<HiringRequest[]>(
      supabase
        .from("hiring_requests")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50),
    ),
    safeQuery<ContactMessage[]>(
      supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50),
    ),
  ]);

  return {
    contentByLocale,
    settings,
    services,
    projects,
    hiringRequests: hiringRequests ?? [],
    contactMessages: contactMessages ?? [],
    configured: true,
  };
}

export function linesToTextarea(lines: string[]) {
  return lines.join("\n");
}
