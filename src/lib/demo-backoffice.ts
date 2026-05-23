import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase-admin";

export type DemoLead = {
  id: string;
  name: string;
  company: string;
  email: string | null;
  service: "AI chatbot" | "Booking system" | "Dashboard" | "API integration";
  budget: string;
  status: "new" | "qualified" | "proposal" | "won";
  priority: number;
  notes: string;
  source: string;
  created_at: string;
};

export type DemoTask = {
  id: string;
  title: string;
  area: "Frontend" | "Backend" | "Database" | "AI";
  status: "queued" | "in_progress" | "done";
  owner: string;
  impact: number;
  due_date: string | null;
  created_at: string;
};

export type DemoEvent = {
  id: string;
  event_type: "lead_created" | "task_completed" | "proposal_sent" | "system_note";
  message: string;
  created_at: string;
};

export type DemoOverview = {
  configured: boolean;
  error?: string;
  leads: DemoLead[];
  tasks: DemoTask[];
  events: DemoEvent[];
  stats: {
    totalLeads: number;
    hotLeads: number;
    openTasks: number;
    completedTasks: number;
  };
};

const emptyOverview: DemoOverview = {
  configured: false,
  leads: [],
  tasks: [],
  events: [],
  stats: {
    totalLeads: 0,
    hotLeads: 0,
    openTasks: 0,
    completedTasks: 0,
  },
};

export async function getDemoOverview(
  options: { leadLimit?: number; taskLimit?: number; eventLimit?: number } = {},
): Promise<DemoOverview> {
  const leadLimit = options.leadLimit ?? 12;
  const taskLimit = options.taskLimit ?? 12;
  const eventLimit = options.eventLimit ?? 8;

  if (!isSupabaseConfigured()) {
    return {
      ...emptyOverview,
      error: "Supabase is not configured for this deployment yet.",
    };
  }

  const supabase = getSupabaseAdmin();
  const [leadsResult, tasksResult, eventsResult] = await Promise.all([
    supabase
      .from("demo_leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(leadLimit),
    supabase
      .from("demo_tasks")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(taskLimit),
    supabase
      .from("demo_events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(eventLimit),
  ]);

  const error = leadsResult.error ?? tasksResult.error ?? eventsResult.error;

  if (error) {
    return {
      ...emptyOverview,
      configured: true,
      error: error.message,
    };
  }

  const leads = (leadsResult.data ?? []) as DemoLead[];
  const tasks = (tasksResult.data ?? []) as DemoTask[];
  const events = (eventsResult.data ?? []) as DemoEvent[];

  return {
    configured: true,
    leads,
    tasks,
    events,
    stats: {
      totalLeads: leads.length,
      hotLeads: leads.filter((lead) => lead.priority >= 4).length,
      openTasks: tasks.filter((task) => task.status !== "done").length,
      completedTasks: tasks.filter((task) => task.status === "done").length,
    },
  };
}

export function formatDate(value: string | null) {
  if (!value) {
    return "No date";
  }

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
