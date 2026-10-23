export type DemoRequestStatus = "new" | "contacted" | "qualified" | "closed";
export type DemoRequestPriority = "normal" | "high" | "urgent";

export type DemoRequestRecord = {
  id: string;
  created_at: string;
  updated_at: string;
  package_type: "silver" | "bronze" | "gold" | "consultation";
  locale: "en" | "ar";
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  business_type: string;
  source: string;
  address: string;
  message: string;
  status: DemoRequestStatus;
  priority: DemoRequestPriority;
  follow_up_at: string | null;
  admin_notes: string;
};

export type DemoRequestActivity = {
  id: string;
  lead_id: string;
  activity_type: "created" | "status" | "priority" | "follow_up" | "note";
  details: string;
  created_at: string;
  actor: string;
};

export async function saveNewsletterSubscriber(email: string, locale: "en" | "ar") {
  const query = new URLSearchParams({ on_conflict: "email" });
  await supabaseRequest(`newsletter_subscribers?${query.toString()}`, {
    method: "POST",
    headers: { Prefer: "resolution=ignore-duplicates,return=minimal" },
    body: JSON.stringify({ email: email.trim().toLowerCase(), locale }),
  });
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  const legacyServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const apiKey = secretKey || legacyServiceRoleKey;
  if (!url || !apiKey) throw new Error("Supabase CRM storage is not configured.");
  return { url, apiKey, usesLegacyJwt: !secretKey };
}

async function supabaseRequest(path: string, init: RequestInit = {}) {
  const { url, apiKey, usesLegacyJwt } = getSupabaseConfig();
  const headers = new Headers(init.headers);
  headers.set("apikey", apiKey);
  if (usesLegacyJwt) headers.set("Authorization", `Bearer ${apiKey}`);
  headers.set("Content-Type", "application/json");
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers,
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    console.error(`Supabase CRM request failed with status ${response.status}.`);
    throw new Error("CRM storage request failed.");
  }
  return response;
}

export async function saveDemoRequest(record: Omit<DemoRequestRecord, "id" | "created_at" | "updated_at" | "status" | "priority" | "follow_up_at" | "admin_notes" | "source"> & { source?: string }) {
  const response = await supabaseRequest("demo_requests", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(record),
  });
  const inserted = (await response.json()) as DemoRequestRecord[];
  return inserted[0] ?? null;
}

export async function getDemoRequests(page = 1, pageSize = 50, status = "all", search = "") {
  const from = (page - 1) * pageSize;
  const query = new URLSearchParams({
    select: "id,created_at,updated_at,package_type,locale,first_name,last_name,email,phone_number,business_type,source,address,message,status,priority,follow_up_at,admin_notes",
    order: "created_at.desc",
    limit: String(pageSize),
    offset: String(from),
  });
  if (status !== "all") query.set("status", `eq.${status}`);
  const searchValue = search.trim().replace(/[^\p{L}\p{N}@._+\- ]/gu, "").slice(0, 80);
  if (searchValue) {
    const term = `*${searchValue}*`;
    query.set("or", `(first_name.ilike.${term},last_name.ilike.${term},email.ilike.${term},phone_number.ilike.${term},business_type.ilike.${term})`);
  }
  const response = await supabaseRequest(`demo_requests?${query.toString()}`, {
    headers: { Prefer: "count=exact" },
  });
  const contentRange = response.headers.get("content-range");
  const total = Number(contentRange?.split("/")[1] ?? 0);
  return { leads: (await response.json()) as DemoRequestRecord[], total };
}

export async function getDemoRequestStatusCounts() {
  const statuses: DemoRequestStatus[] = ["new", "contacted", "qualified", "closed"];
  const counts = await Promise.all(statuses.map(async (status) => {
    const query = new URLSearchParams({ select: "id", status: `eq.${status}` });
    const response = await supabaseRequest(`demo_requests?${query.toString()}`, {
      method: "HEAD",
      headers: { Prefer: "count=exact", Range: "0-0" },
    });
    const total = Number(response.headers.get("content-range")?.split("/")[1] ?? 0);
    return [status, Number.isFinite(total) ? total : 0] as const;
  }));
  return Object.fromEntries(counts) as Record<DemoRequestStatus, number>;
}

export async function updateDemoRequest(id: string, updates: {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  business_type?: string;
  source?: string;
  address?: string;
  package_type?: DemoRequestRecord["package_type"];
  message?: string;
  status?: DemoRequestStatus;
  priority?: DemoRequestPriority;
  follow_up_at?: string | null;
  admin_notes?: string;
}) {
  const query = new URLSearchParams({ id: `eq.${id}` });
  const response = await supabaseRequest(`demo_requests?${query.toString()}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ ...updates, updated_at: new Date().toISOString() }),
  });
  const updated = (await response.json()) as DemoRequestRecord[];
  return updated[0] ?? null;
}

export async function getDemoRequestActivities(leadId: string) {
  const query = new URLSearchParams({
    select: "id,lead_id,activity_type,details,created_at,actor",
    lead_id: `eq.${leadId}`,
    order: "created_at.desc",
    limit: "100",
  });
  const response = await supabaseRequest(`demo_request_activities?${query.toString()}`);
  return (await response.json()) as DemoRequestActivity[];
}

export async function addDemoRequestActivity(leadId: string, activityType: DemoRequestActivity["activity_type"], details: string) {
  const response = await supabaseRequest("demo_request_activities", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ lead_id: leadId, activity_type: activityType, details, actor: "Admin" }),
  });
  const inserted = (await response.json()) as DemoRequestActivity[];
  return inserted[0] ?? null;
}

export async function isCrmAdminActive(username: string) {
  const query = new URLSearchParams({
    select: "id",
    username: `eq.${username.trim().toLowerCase()}`,
    is_active: "eq.true",
    limit: "1",
  });
  const response = await supabaseRequest(`crm_admins?${query.toString()}`);
  const accounts = (await response.json()) as Array<{ id: string }>;
  return accounts.length === 1;
}
