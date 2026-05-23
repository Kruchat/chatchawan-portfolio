export const locales = ["en", "th", "zh"] as const;

export type Locale = (typeof locales)[number];

export type OptionCopy = {
  value: string;
  label: string;
};

export type ProjectClientCopy = {
  customerPlayground: string;
  tryWorkflow: string;
  liveDatabase: string;
  demoMode: string;
  contactName: string;
  company: string;
  email: string;
  industry: string;
  workflow: string;
  budget: string;
  projectGoal: string;
  timing: string;
  aiQualification: string;
  leadScoreTemplate: string;
  suggestedFirstMilestoneTemplate: string;
  lowercaseSuggestedMilestone: boolean;
  saveToCrm: string;
  successMessage: string;
  errorMessage: string;
  generatedPlan: string;
  whatClientSees: string;
  liveLeads: string;
  hotLeads: string;
  openTasks: string;
  operationsFeed: string;
  latestRecords: string;
  fallbackNote: string;
  proofNote: string;
  industries: OptionCopy[];
  channels: OptionCopy[];
  budgets: OptionCopy[];
  urgencies: OptionCopy[];
  plans: {
    aiChatbot: string[];
    bookingSystem: string[];
    dashboard: string[];
    apiIntegration: string[];
  };
};

export type HomeCopy = {
  localeName: string;
  nav: {
    work: string;
    demo: string;
    liveProject: string;
    services: string;
    process: string;
    admin: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    viewWork: string;
    liveDemo: string;
    playProject: string;
    process: string;
  };
  proofPoints: Array<{ value: string; label: string }>;
  visual: {
    flowEyebrow: string;
    flowTitle: string;
    badge: string;
    steps: string[];
    stack: string;
    clientNoteLabel: string;
    clientNote: string;
    quality: string;
    checks: string[];
  };
  work: {
    eyebrow: string;
    title: string;
    body: string;
    projects: Array<{
      name: string;
      type: string;
      summary: string;
      tags: string[];
      accent: string;
      href: string;
    }>;
  };
  services: {
    eyebrow: string;
    title: string;
    body: string;
    items: Array<{ title: string; body: string }>;
  };
  process: {
    eyebrow: string;
    title: string;
    body: string;
    steps: string[];
  };
  summary: {
    eyebrow: string;
    title: string;
    body: string;
    lines: string[];
  };
  footer: {
    note: string;
    badges: string[];
  };
};

export type ProjectPageCopy = {
  metadataTitle: string;
  metadataDescription: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  body: string;
  tryWorkflow: string;
  viewBackoffice: string;
  proofEyebrow: string;
  proofTitle: string;
  proofBody: string;
  client: ProjectClientCopy;
};

const projectClientCopies: Record<Locale, ProjectClientCopy> = {
  en: {
    customerPlayground: "Customer playground",
    tryWorkflow: "Try the AI intake workflow",
    liveDatabase: "Live database",
    demoMode: "Demo mode",
    contactName: "Contact name",
    company: "Company",
    email: "Email",
    industry: "Industry",
    workflow: "Workflow",
    budget: "Budget",
    projectGoal: "Project goal",
    timing: "Timing",
    aiQualification: "AI-style qualification",
    leadScoreTemplate: "{{service}} lead, score {{score}}/100",
    suggestedFirstMilestoneTemplate: "Suggested first milestone: {{milestone}}.",
    lowercaseSuggestedMilestone: true,
    saveToCrm: "Save to live CRM",
    successMessage:
      "Saved to the live Supabase database. The operations feed below is updated.",
    errorMessage: "Could not save this demo request.",
    generatedPlan: "Generated plan",
    whatClientSees: "What the client sees",
    liveLeads: "Live leads",
    hotLeads: "Hot leads",
    openTasks: "Open tasks",
    operationsFeed: "Operations feed",
    latestRecords: "Latest Supabase records",
    fallbackNote: "New lead created from the live demo.",
    proofNote:
      "This page is a real Next.js project demo: client interaction, API route, server-side Supabase key, live database writes, and refreshed dashboard data.",
    industries: [
      { value: "Travel agency", label: "Travel agency" },
      { value: "School / education", label: "School / education" },
      { value: "Local government office", label: "Local government office" },
      { value: "Clinic / service business", label: "Clinic / service business" },
      { value: "Online service team", label: "Online service team" },
    ],
    channels: [
      { value: "Website chatbot + CRM", label: "Website chatbot + CRM" },
      { value: "LINE OA automation", label: "LINE OA automation" },
      { value: "Booking dashboard", label: "Booking dashboard" },
      { value: "Admin reporting system", label: "Admin reporting system" },
      { value: "API integration", label: "API integration" },
    ],
    budgets: [
      { value: "Discovery", label: "Discovery" },
      { value: "$500 - $1k", label: "$500 - $1k" },
      { value: "$1k - $3k", label: "$1k - $3k" },
      { value: "$3k+", label: "$3k+" },
    ],
    urgencies: [
      { value: "Need discovery first", label: "Need discovery first" },
      { value: "Launch MVP in 2 weeks", label: "Launch MVP in 2 weeks" },
      { value: "Fix an existing system", label: "Fix an existing system" },
      { value: "Scale current workflow", label: "Scale current workflow" },
    ],
    plans: {
      aiChatbot: [
        "Map customer questions and handoff rules",
        "Build Next.js intake UI and API route",
        "Store leads and conversation notes in Supabase",
        "Prepare admin review screen for the team",
      ],
      bookingSystem: [
        "Design booking request flow and status model",
        "Create Supabase records for requests and activity",
        "Build operations dashboard for follow-up",
        "Deploy MVP and test mobile form behavior",
      ],
      dashboard: [
        "Audit current data fields and reporting needs",
        "Create typed data layer and summary metrics",
        "Build responsive dashboard screens",
        "Document handoff and next iteration items",
      ],
      apiIntegration: [
        "Confirm API payloads and authentication needs",
        "Build a small integration endpoint first",
        "Log success and failure events clearly",
        "Ship a scoped PR with deployment notes",
      ],
    },
  },
  th: {
    customerPlayground: "พื้นที่ทดลองสำหรับลูกค้า",
    tryWorkflow: "ทดลองระบบรับบรีฟด้วย AI",
    liveDatabase: "ฐานข้อมูลจริง",
    demoMode: "โหมดทดลอง",
    contactName: "ชื่อผู้ติดต่อ",
    company: "บริษัท / หน่วยงาน",
    email: "อีเมล",
    industry: "ประเภทธุรกิจ",
    workflow: "ระบบที่ต้องการ",
    budget: "งบประมาณ",
    projectGoal: "เป้าหมายของโปรเจค",
    timing: "ระยะเวลา",
    aiQualification: "การประเมินแบบ AI",
    leadScoreTemplate: "ลูกค้า {{service}}, คะแนน {{score}}/100",
    suggestedFirstMilestoneTemplate: "Milestone แรกที่แนะนำ: {{milestone}}",
    lowercaseSuggestedMilestone: false,
    saveToCrm: "บันทึกเข้า CRM จริง",
    successMessage: "บันทึกลงฐานข้อมูล Supabase จริงแล้ว ข้อมูลด้านล่างอัปเดตทันที",
    errorMessage: "ยังบันทึกข้อมูลตัวอย่างไม่ได้",
    generatedPlan: "แผนงานที่ระบบสร้าง",
    whatClientSees: "สิ่งที่ลูกค้าเห็น",
    liveLeads: "Leads จริง",
    hotLeads: "Leads สำคัญ",
    openTasks: "งานที่เปิดอยู่",
    operationsFeed: "ฟีดหลังบ้าน",
    latestRecords: "ข้อมูลล่าสุดจาก Supabase",
    fallbackNote: "Lead ใหม่จากหน้า live demo",
    proofNote:
      "หน้านี้เป็นโปรเจค Next.js จริง มี interaction, API route, service key ฝั่ง server, เขียนข้อมูลลง Supabase จริง และ refresh dashboard จากฐานข้อมูล",
    industries: [
      { value: "Travel agency", label: "บริษัททัวร์ / ท่องเที่ยว" },
      { value: "School / education", label: "โรงเรียน / การศึกษา" },
      { value: "Local government office", label: "หน่วยงานราชการท้องถิ่น" },
      { value: "Clinic / service business", label: "คลินิก / ธุรกิจบริการ" },
      { value: "Online service team", label: "ทีมบริการออนไลน์" },
    ],
    channels: [
      { value: "Website chatbot + CRM", label: "แชตบอตเว็บไซต์ + CRM" },
      { value: "LINE OA automation", label: "LINE OA Automation" },
      { value: "Booking dashboard", label: "ระบบจอง + Dashboard" },
      { value: "Admin reporting system", label: "ระบบรายงานหลังบ้าน" },
      { value: "API integration", label: "เชื่อมต่อ API" },
    ],
    budgets: [
      { value: "Discovery", label: "เริ่มจากวิเคราะห์งาน" },
      { value: "$500 - $1k", label: "$500 - $1k" },
      { value: "$1k - $3k", label: "$1k - $3k" },
      { value: "$3k+", label: "$3k+" },
    ],
    urgencies: [
      { value: "Need discovery first", label: "ต้องเริ่มจาก discovery ก่อน" },
      { value: "Launch MVP in 2 weeks", label: "ต้องการ MVP ภายใน 2 สัปดาห์" },
      { value: "Fix an existing system", label: "ต้องการแก้ระบบเดิม" },
      { value: "Scale current workflow", label: "ต้องการขยาย workflow เดิม" },
    ],
    plans: {
      aiChatbot: [
        "สรุปคำถามลูกค้าและเงื่อนไขส่งต่อให้ทีม",
        "สร้างหน้า intake ด้วย Next.js และ API route",
        "บันทึก leads และ notes ลง Supabase",
        "เตรียมหน้าหลังบ้านให้ทีมตรวจสอบ",
      ],
      bookingSystem: [
        "ออกแบบ flow การจองและสถานะงาน",
        "สร้าง records ใน Supabase สำหรับคำขอและกิจกรรม",
        "ทำ dashboard ฝั่ง operation สำหรับติดตามงาน",
        "Deploy MVP และทดสอบการใช้งานบนมือถือ",
      ],
      dashboard: [
        "ตรวจ field ข้อมูลและรายงานที่ต้องใช้",
        "ทำ data layer และตัวเลขสรุปแบบ typed",
        "สร้าง dashboard ที่ responsive",
        "ทำเอกสาร handoff และรายการรอบถัดไป",
      ],
      apiIntegration: [
        "ยืนยัน payload และระบบยืนยันตัวตนของ API",
        "ทำ endpoint ชุดเล็กก่อน",
        "เก็บ log สำเร็จ/ล้มเหลวให้ชัดเจน",
        "ส่งมอบ PR พร้อม notes สำหรับ deploy",
      ],
    },
  },
  zh: {
    customerPlayground: "客户体验区",
    tryWorkflow: "体验 AI 需求收集流程",
    liveDatabase: "真实数据库",
    demoMode: "演示模式",
    contactName: "联系人",
    company: "公司 / 机构",
    email: "电子邮件",
    industry: "行业",
    workflow: "工作流程",
    budget: "预算",
    projectGoal: "项目目标",
    timing: "时间安排",
    aiQualification: "AI 式线索评估",
    leadScoreTemplate: "{{service}} 线索，评分 {{score}}/100",
    suggestedFirstMilestoneTemplate: "建议的第一个 milestone：{{milestone}}",
    lowercaseSuggestedMilestone: false,
    saveToCrm: "保存到真实 CRM",
    successMessage: "已保存到 Supabase 真实数据库。下方运营数据已更新。",
    errorMessage: "暂时无法保存此演示请求。",
    generatedPlan: "生成的交付计划",
    whatClientSees: "客户会看到什么",
    liveLeads: "真实线索",
    hotLeads: "高优先级线索",
    openTasks: "进行中任务",
    operationsFeed: "运营动态",
    latestRecords: "Supabase 最新记录",
    fallbackNote: "来自 live demo 的新线索。",
    proofNote:
      "这是一个真实的 Next.js 项目演示：客户交互、API route、服务器端 Supabase key、真实数据库写入，以及实时刷新的 dashboard 数据。",
    industries: [
      { value: "Travel agency", label: "旅游公司" },
      { value: "School / education", label: "学校 / 教育" },
      { value: "Local government office", label: "地方政府机构" },
      { value: "Clinic / service business", label: "诊所 / 服务行业" },
      { value: "Online service team", label: "在线服务团队" },
    ],
    channels: [
      { value: "Website chatbot + CRM", label: "网站聊天机器人 + CRM" },
      { value: "LINE OA automation", label: "LINE OA 自动化" },
      { value: "Booking dashboard", label: "预订 dashboard" },
      { value: "Admin reporting system", label: "后台报表系统" },
      { value: "API integration", label: "API 集成" },
    ],
    budgets: [
      { value: "Discovery", label: "先做需求分析" },
      { value: "$500 - $1k", label: "$500 - $1k" },
      { value: "$1k - $3k", label: "$1k - $3k" },
      { value: "$3k+", label: "$3k+" },
    ],
    urgencies: [
      { value: "Need discovery first", label: "需要先做 discovery" },
      { value: "Launch MVP in 2 weeks", label: "2 周内上线 MVP" },
      { value: "Fix an existing system", label: "修复现有系统" },
      { value: "Scale current workflow", label: "扩展现有流程" },
    ],
    plans: {
      aiChatbot: [
        "梳理客户问题和人工交接规则",
        "建立 Next.js intake UI 和 API route",
        "把线索和对话备注保存到 Supabase",
        "准备团队使用的后台审核页面",
      ],
      bookingSystem: [
        "设计预订请求流程和状态模型",
        "在 Supabase 建立请求和活动记录",
        "建立运营 dashboard 方便跟进",
        "部署 MVP 并测试移动端表单体验",
      ],
      dashboard: [
        "审查现有数据字段和报表需求",
        "建立 typed data layer 和关键指标",
        "开发响应式 dashboard 页面",
        "整理交接文档和下一阶段事项",
      ],
      apiIntegration: [
        "确认 API payload 和认证方式",
        "先建立一个小范围集成 endpoint",
        "清晰记录成功和失败事件",
        "交付 scoped PR 和部署说明",
      ],
    },
  },
};

export const homeCopies: Record<Locale, HomeCopy> = {
  en: {
    localeName: "English",
    nav: {
      work: "Work",
      demo: "Demo",
      liveProject: "Live Project",
      services: "Services",
      process: "Process",
      admin: "Admin",
    },
    hero: {
      eyebrow: "Next.js, AI automation, and business dashboards",
      title: "I build practical AI and booking systems that teams can actually run.",
      body:
        "Programmer based in Thailand, focused on Next.js App Router, TypeScript, Supabase, APIs, and AI workflow integrations for schools, travel, small business, and internal operations.",
      viewWork: "View work",
      liveDemo: "Live demo",
      playProject: "Play project",
      process: "First PR process",
    },
    proofPoints: [
      { value: "10+", label: "years building business systems" },
      { value: "Thai + global", label: "client experience" },
      { value: "UTC+7", label: "async friendly timezone" },
    ],
    visual: {
      flowEyebrow: "Production flow",
      flowTitle: "Booking and AI intake",
      badge: "live-ready",
      steps: ["User request", "AI triage", "Supabase write", "Admin review"],
      stack: "Stack",
      clientNoteLabel: "client note",
      clientNote: "Clear async updates, scoped milestones, and handoff notes.",
      quality: "Quality checks",
      checks: ["Types", "Responsive", "API paths", "Deploy"],
    },
    work: {
      eyebrow: "Selected work",
      title: "Systems and case studies for Upwork clients to review.",
      body:
        "These examples focus on the same skills requested in AI product, dashboard, and integration roles.",
      projects: [
        {
          name: "AI Service CRM Live Project",
          type: "Interactive demo",
          summary:
            "A playable Next.js + Supabase mini product where clients submit a project request, receive AI-style qualification, and see live CRM data update.",
          tags: ["Next.js", "Supabase", "API route", "Live CRM"],
          accent: "bg-[#2dd4bf]",
          href: "/projects/ai-service-crm",
        },
        {
          name: "Hong Kong Mode Booking Workflow",
          type: "Tour booking platform",
          summary:
            "Next.js App Router system for tour discovery, booking flow, pickup registration, invoices, admin content, and Supabase-backed operations.",
          tags: ["Next.js", "Supabase", "Admin dashboard", "Booking flow"],
          accent: "bg-[#f6c453]",
          href: "/demo/backoffice",
        },
        {
          name: "AI Chatbot and LINE OA Automation",
          type: "Automation service",
          summary:
            "Conversation flows for lead intake, FAQ handling, booking support, and handoff logic with API integrations for small teams.",
          tags: ["AI chatbot", "Automation", "API", "LINE OA"],
          accent: "bg-[#2dd4bf]",
          href: "/projects/ai-service-crm",
        },
      ],
    },
    services: {
      eyebrow: "What I can own",
      title: "Useful full-stack work without turning the project into a maze.",
      body:
        "Best fit: focused milestones, existing app cleanup, AI features, and dashboards where speed and clarity matter.",
      items: [
        {
          title: "App Router interfaces",
          body:
            "Clean route-level UI, responsive layouts, admin screens, forms, and client-ready product pages.",
        },
        {
          title: "Supabase and Postgres",
          body:
            "Schema-aware dashboards, CRUD flows, auth-aware data access, migrations, and typed mapping between DB and UI.",
        },
        {
          title: "AI product features",
          body:
            "Chat flows, prompt pipelines, API wrappers, automation handoffs, and practical MVPs that can ship in stages.",
        },
        {
          title: "Integration cleanup",
          body:
            "Webhooks, third-party APIs, payment status logic, deployment checks, and bug fixes in existing systems.",
        },
      ],
    },
    process: {
      eyebrow: "Delivery process",
      title: "Built for scoped PRs, not vague promises.",
      body:
        "A practical flow for clients who already have a product and need a reliable engineer to understand it, fix it, and leave it cleaner.",
      steps: [
        "Read the existing codebase before changing it",
        "Confirm the smallest useful first milestone",
        "Ship a focused PR with clear notes",
        "Test the flow and document handoff details",
      ],
    },
    summary: {
      eyebrow: "Proposal-ready summary",
      title: "Next.js App Router developer for AI, Supabase, and dashboard work.",
      body:
        "Available for a well-scoped first PR, especially email editors, popup builders, admin dashboards, booking workflows, API cleanup, and AI-assisted product features.",
      lines: [
        "Next.js App Router project: live AI Service CRM with Supabase database.",
        "Tricky TypeScript fix: DB row types, API payloads, and optional UI fields.",
        "Timezone: Asia/Bangkok (UTC+7), async friendly.",
      ],
    },
    footer: {
      note: "Chatchawan T. - Next.js, AI automation, and business systems.",
      badges: ["Contract-first work only", "TypeScript first", "Upwork-ready"],
    },
  },
  th: {
    localeName: "ไทย",
    nav: {
      work: "ผลงาน",
      demo: "เดโม",
      liveProject: "โปรเจคจริง",
      services: "บริการ",
      process: "ขั้นตอน",
      admin: "แอดมิน",
    },
    hero: {
      eyebrow: "Next.js, AI Automation และ Dashboard ธุรกิจ",
      title: "ผมสร้างระบบ AI และระบบจองที่ทีมใช้งานจริงได้ ไม่ใช่แค่หน้าตาสวย",
      body:
        "โปรแกรมเมอร์จากประเทศไทย เชี่ยวชาญ Next.js App Router, TypeScript, Supabase, API และการเชื่อม AI workflow สำหรับโรงเรียน ธุรกิจท่องเที่ยว ธุรกิจบริการ และระบบหลังบ้าน",
      viewWork: "ดูผลงาน",
      liveDemo: "ดูเดโม",
      playProject: "ทดลองโปรเจค",
      process: "ขั้นตอนส่งงาน",
    },
    proofPoints: [
      { value: "10+", label: "ปีในการพัฒนาระบบธุรกิจ" },
      { value: "ไทย + ต่างประเทศ", label: "ประสบการณ์ลูกค้า" },
      { value: "UTC+7", label: "ทำงาน async ได้สะดวก" },
    ],
    visual: {
      flowEyebrow: "Production flow",
      flowTitle: "ระบบจองและ AI Intake",
      badge: "พร้อมใช้งานจริง",
      steps: ["ลูกค้าส่งคำขอ", "AI คัดกรอง", "บันทึก Supabase", "แอดมินตรวจสอบ"],
      stack: "เทคโนโลยี",
      clientNoteLabel: "client note",
      clientNote: "อัปเดตงานชัดเจน แบ่ง milestone และส่ง handoff notes ให้ครบ",
      quality: "ตรวจคุณภาพ",
      checks: ["Types", "Responsive", "API paths", "Deploy"],
    },
    work: {
      eyebrow: "ผลงานที่เลือกมา",
      title: "ระบบและ case study สำหรับให้ลูกค้า Upwork ตรวจสอบ",
      body:
        "ตัวอย่างเหล่านี้เน้นทักษะที่ลูกค้าต่างประเทศมักต้องการ: AI product, dashboard และ integration",
      projects: [
        {
          name: "AI Service CRM Live Project",
          type: "โปรเจคที่ทดลองเล่นได้",
          summary:
            "Mini product ด้วย Next.js + Supabase ให้ลูกค้ากรอกบรีฟ เห็นการประเมินแบบ AI และดูข้อมูล CRM ที่อัปเดตจากฐานข้อมูลจริง",
          tags: ["Next.js", "Supabase", "API route", "Live CRM"],
          accent: "bg-[#2dd4bf]",
          href: "/projects/ai-service-crm",
        },
        {
          name: "Hong Kong Mode Booking Workflow",
          type: "ระบบจองทัวร์",
          summary:
            "ระบบ Next.js App Router สำหรับดูทัวร์ จองทริป ลงทะเบียนจุดรับ ออกใบแจ้งหนี้ จัดการ content และ operation ด้วย Supabase",
          tags: ["Next.js", "Supabase", "Admin dashboard", "Booking flow"],
          accent: "bg-[#f6c453]",
          href: "/demo/backoffice",
        },
        {
          name: "AI Chatbot and LINE OA Automation",
          type: "งาน Automation",
          summary:
            "ออกแบบ flow แชตสำหรับรับ lead, ตอบ FAQ, ช่วยงาน booking และส่งต่อให้ทีม พร้อมเชื่อมต่อ API ตาม workflow",
          tags: ["AI chatbot", "Automation", "API", "LINE OA"],
          accent: "bg-[#2dd4bf]",
          href: "/projects/ai-service-crm",
        },
      ],
    },
    services: {
      eyebrow: "งานที่รับผิดชอบได้",
      title: "งาน Full-stack ที่ใช้งานจริง โดยไม่ทำให้ระบบซับซ้อนเกินจำเป็น",
      body:
        "เหมาะกับงานที่ต้องแบ่ง milestone ชัดเจน ปรับระบบเดิม เพิ่ม AI feature หรือทำ dashboard ที่ต้องการทั้งความเร็วและความมั่นใจ",
      items: [
        {
          title: "หน้าระบบด้วย App Router",
          body: "ทำหน้า UI ระดับ route, responsive layout, admin screen, form และหน้าผลิตภัณฑ์ที่พร้อมส่งลูกค้า",
        },
        {
          title: "Supabase และ Postgres",
          body: "ออกแบบ dashboard, CRUD flow, data access, migration และ mapping ระหว่าง database กับ UI แบบ typed",
        },
        {
          title: "ฟีเจอร์ AI ในสินค้า",
          body: "ทำ chat flow, prompt pipeline, API wrapper, automation handoff และ MVP ที่ส่งมอบเป็นรอบได้",
        },
        {
          title: "แก้และเชื่อมระบบ",
          body: "จัดการ webhook, third-party API, payment status, deployment check และ bug fix ในระบบเดิม",
        },
      ],
    },
    process: {
      eyebrow: "ขั้นตอนส่งงาน",
      title: "ทำงานเป็น milestone ชัดเจน ไม่ขายคำสัญญากว้าง ๆ",
      body:
        "เหมาะกับลูกค้าที่มี product อยู่แล้วและต้องการคนเข้าใจระบบ แก้ให้ถูกจุด และส่งมอบให้ดูแลต่อได้ง่าย",
      steps: [
        "อ่าน codebase เดิมก่อนเริ่มแก้",
        "ยืนยัน milestone แรกที่เล็กและคุ้มที่สุด",
        "ส่ง PR ที่ขอบเขตชัดเจนพร้อม notes",
        "ทดสอบ flow และเขียน handoff รายละเอียด",
      ],
    },
    summary: {
      eyebrow: "ข้อความพร้อมส่ง proposal",
      title: "Next.js App Router Developer สำหรับ AI, Supabase และ Dashboard",
      body:
        "พร้อมเริ่มจาก PR แรกที่ scope ชัดเจน โดยเฉพาะ email editor, popup builder, admin dashboard, booking workflow, API cleanup และ AI feature",
      lines: [
        "Next.js App Router project: AI Service CRM ที่เชื่อม Supabase จริง",
        "Tricky TypeScript fix: DB row types, API payloads และ optional UI fields",
        "Timezone: Asia/Bangkok (UTC+7), ทำงาน async ได้สะดวก",
      ],
    },
    footer: {
      note: "Chatchawan T. - Next.js, AI automation และระบบธุรกิจ",
      badges: ["ทำงานตาม contract", "TypeScript first", "พร้อมใช้กับ Upwork"],
    },
  },
  zh: {
    localeName: "中文",
    nav: {
      work: "作品",
      demo: "演示",
      liveProject: "真实项目",
      services: "服务",
      process: "流程",
      admin: "后台",
    },
    hero: {
      eyebrow: "Next.js、AI 自动化与业务 Dashboard",
      title: "我开发团队真正能使用的 AI 与预订系统",
      body:
        "来自泰国的程序员，专注 Next.js App Router、TypeScript、Supabase、API 与 AI workflow 集成，适合学校、旅游、服务业与内部运营系统。",
      viewWork: "查看作品",
      liveDemo: "查看演示",
      playProject: "体验项目",
      process: "交付流程",
    },
    proofPoints: [
      { value: "10+", label: "业务系统开发经验" },
      { value: "泰国 + 国际", label: "客户经验" },
      { value: "UTC+7", label: "适合异步协作" },
    ],
    visual: {
      flowEyebrow: "Production flow",
      flowTitle: "预订与 AI Intake",
      badge: "可上线",
      steps: ["客户请求", "AI 初步评估", "写入 Supabase", "后台审核"],
      stack: "技术栈",
      clientNoteLabel: "client note",
      clientNote: "清晰异步更新、明确 milestone，并提供 handoff notes。",
      quality: "质量检查",
      checks: ["Types", "Responsive", "API paths", "Deploy"],
    },
    work: {
      eyebrow: "精选作品",
      title: "给 Upwork 客户查看的系统和案例",
      body: "这些例子聚焦 AI product、dashboard 和 integration 项目常见需求。",
      projects: [
        {
          name: "AI Service CRM Live Project",
          type: "可交互演示",
          summary:
            "一个可体验的 Next.js + Supabase 小产品：客户提交需求、获得 AI 式评估，并看到真实 CRM 数据更新。",
          tags: ["Next.js", "Supabase", "API route", "Live CRM"],
          accent: "bg-[#2dd4bf]",
          href: "/projects/ai-service-crm",
        },
        {
          name: "Hong Kong Mode Booking Workflow",
          type: "旅游预订平台",
          summary:
            "Next.js App Router 系统，包含旅游展示、预订流程、接送登记、发票、后台内容与 Supabase 运营数据。",
          tags: ["Next.js", "Supabase", "Admin dashboard", "Booking flow"],
          accent: "bg-[#f6c453]",
          href: "/demo/backoffice",
        },
        {
          name: "AI Chatbot and LINE OA Automation",
          type: "自动化服务",
          summary:
            "为 lead intake、FAQ、booking support 和人工交接设计对话流程，并集成 API。",
          tags: ["AI chatbot", "Automation", "API", "LINE OA"],
          accent: "bg-[#2dd4bf]",
          href: "/projects/ai-service-crm",
        },
      ],
    },
    services: {
      eyebrow: "我能负责什么",
      title: "实用的 full-stack 工作，不把项目变复杂",
      body: "适合明确 milestone、现有系统整理、AI feature、以及需要速度和清晰度的 dashboard。",
      items: [
        {
          title: "App Router 界面",
          body: "开发 route-level UI、响应式布局、后台页面、表单和可交付给客户的产品页面。",
        },
        {
          title: "Supabase 与 Postgres",
          body: "Schema-aware dashboard、CRUD flow、数据访问、migration，以及 DB 到 UI 的 typed mapping。",
        },
        {
          title: "AI 产品功能",
          body: "Chat flow、prompt pipeline、API wrapper、automation handoff，以及可分阶段上线的 MVP。",
        },
        {
          title: "集成与系统整理",
          body: "Webhook、第三方 API、付款状态逻辑、部署检查，以及现有系统 bug fix。",
        },
      ],
    },
    process: {
      eyebrow: "交付流程",
      title: "以 scoped PR 交付，不做模糊承诺",
      body: "适合已有产品、需要工程师理解系统、精准修复并让后续维护更简单的客户。",
      steps: [
        "先阅读现有 codebase",
        "确认最小且最有价值的第一阶段",
        "交付清晰范围的 PR 和 notes",
        "测试流程并整理 handoff 细节",
      ],
    },
    summary: {
      eyebrow: "Proposal-ready summary",
      title: "Next.js App Router Developer for AI, Supabase, and dashboard work.",
      body:
        "Available for a well-scoped first PR, especially email editors, popup builders, admin dashboards, booking workflows, API cleanup, and AI-assisted product features.",
      lines: [
        "Next.js App Router project: live AI Service CRM with Supabase database.",
        "Tricky TypeScript fix: DB row types, API payloads, and optional UI fields.",
        "Timezone: Asia/Bangkok (UTC+7), async friendly.",
      ],
    },
    footer: {
      note: "Chatchawan T. - Next.js、AI 自动化与业务系统",
      badges: ["Contract-first", "TypeScript first", "Upwork-ready"],
    },
  },
};

export const projectPageCopies: Record<Locale, ProjectPageCopy> = {
  en: {
    metadataTitle: "AI Service CRM Live Project | Chatchawan T.",
    metadataDescription:
      "Interactive Next.js and Supabase CRM demo for AI intake, lead qualification, and live database updates.",
    backLabel: "Portfolio",
    eyebrow: "Live client project",
    title: "AI Service CRM that clients can actually click, test, and understand.",
    body:
      "This is a focused mini product for Upwork and international clients: an AI-style intake workflow, a generated delivery plan, and real Supabase CRM records behind the screen.",
    tryWorkflow: "Try the workflow",
    viewBackoffice: "View backoffice",
    proofEyebrow: "Proposal proof",
    proofTitle: "Next.js App Router, TypeScript, API routes, and Supabase.",
    proofBody:
      "Send this page when a client asks for a real project link, not just a static portfolio screenshot.",
    client: projectClientCopies.en,
  },
  th: {
    metadataTitle: "AI Service CRM Live Project | Chatchawan T.",
    metadataDescription:
      "โปรเจค Next.js และ Supabase ที่ลูกค้าทดลองเล่นได้จริง สำหรับ AI intake, lead qualification และ database update",
    backLabel: "กลับหน้า Portfolio",
    eyebrow: "โปรเจคจริงสำหรับลูกค้า",
    title: "AI Service CRM ที่ลูกค้ากดเล่น ทดสอบ และเข้าใจงานได้ทันที",
    body:
      "นี่คือ mini product สำหรับส่งให้ลูกค้า Upwork และลูกค้าต่างประเทศ มีระบบรับบรีฟแบบ AI-style สร้างแผนงาน และบันทึก CRM ลง Supabase จริง",
    tryWorkflow: "ทดลอง workflow",
    viewBackoffice: "ดูหลังบ้าน",
    proofEyebrow: "หลักฐานสำหรับ proposal",
    proofTitle: "Next.js App Router, TypeScript, API routes และ Supabase",
    proofBody:
      "ใช้ส่งให้ลูกค้าเวลาต้องการลิงก์โปรเจคจริง ไม่ใช่แค่รูป screenshot ของ portfolio",
    client: projectClientCopies.th,
  },
  zh: {
    metadataTitle: "AI Service CRM Live Project | Chatchawan T.",
    metadataDescription:
      "可交互的 Next.js 与 Supabase CRM 演示，用于 AI intake、线索评估与真实数据库更新。",
    backLabel: "返回 Portfolio",
    eyebrow: "真实客户项目",
    title: "客户可以真正点击、测试并理解的 AI Service CRM",
    body:
      "这是给 Upwork 与国际客户查看的小型产品：AI 式需求收集、自动生成交付计划，以及背后真实的 Supabase CRM 记录。",
    tryWorkflow: "体验流程",
    viewBackoffice: "查看后台",
    proofEyebrow: "Proposal proof",
    proofTitle: "Next.js App Router、TypeScript、API routes 与 Supabase",
    proofBody: "当客户需要真实项目链接时，发送这个页面比静态截图更有说服力。",
    client: projectClientCopies.zh,
  },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getHomeCopy(locale: Locale) {
  return homeCopies[locale];
}

export function getProjectPageCopy(locale: Locale) {
  return projectPageCopies[locale];
}

export function localizedPath(locale: Locale, path: string) {
  if (path === "/" || path === "") {
    return `/${locale}`;
  }

  if (path.startsWith("/demo") || path.startsWith("/admin")) {
    return path;
  }

  return `/${locale}${path}`;
}
