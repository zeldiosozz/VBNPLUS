import { isAdminRequest } from "@/lib/crm-auth";
import { getDemoRequests, getDemoRequestStatusCounts, saveDemoRequest, updateDemoRequest, type DemoRequestStatus } from "@/lib/demo-requests-db";
import { z } from "zod";

const createLeadSchema = z.object({
  first_name: z.string().trim().min(1).max(80),
  last_name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(254),
  phone_number: z.string().trim().min(7).max(40),
  business_type: z.string().trim().min(2).max(160),
  source: z.string().trim().min(1).max(80),
  address: z.string().trim().min(3).max(300),
  package_type: z.enum(["silver", "bronze", "gold", "consultation"]),
  message: z.string().trim().max(1500).default(""),
});

const updateLeadSchema = z.object({
  id: z.string().uuid(),
  first_name: z.string().trim().min(1).max(80).optional(),
  last_name: z.string().trim().min(1).max(80).optional(),
  email: z.string().trim().email().max(254).optional(),
  phone_number: z.string().trim().min(7).max(40).optional(),
  business_type: z.string().trim().min(2).max(160).optional(),
  source: z.string().trim().min(1).max(80).optional(),
  address: z.string().trim().min(3).max(300).optional(),
  package_type: z.enum(["silver", "bronze", "gold", "consultation"]).optional(),
  message: z.string().trim().max(1500).optional(),
  status: z.enum(["new", "contacted", "qualified", "closed"]).optional(),
  priority: z.enum(["normal", "high", "urgent"]).optional(),
  follow_up_at: z.string().datetime().nullable().optional(),
  admin_notes: z.string().trim().max(5000).optional(),
}).strict();

const statusNames: DemoRequestStatus[] = ["new", "contacted", "qualified", "closed"];

export async function POST(request: Request) {
  if (!(await isAdminRequest(request))) return Response.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const parsed = createLeadSchema.safeParse(await request.json());
    if (!parsed.success) return Response.json({ error: "Check the lead details and try again." }, { status: 400 });
    const lead = await saveDemoRequest({ ...parsed.data, locale: "en" });
    if (!lead) return Response.json({ error: "Could not create lead." }, { status: 503 });
    return Response.json({ lead }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Could not create lead. Check the CRM database setup." }, { status: 503 });
  }
}

export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) return Response.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const params = new URL(request.url).searchParams;
    const page = Math.floor(Math.max(1, Math.min(100_000, Number(params.get("page")) || 1)));
    const status = params.get("status") ?? "all";
    if (status !== "all" && !statusNames.includes(status as DemoRequestStatus)) {
      return Response.json({ error: "Invalid status filter." }, { status: 400 });
    }
    const [result, counts] = await Promise.all([
      getDemoRequests(page, 50, status, params.get("q") ?? ""),
      getDemoRequestStatusCounts(),
    ]);
    return Response.json({ ...result, counts, page, pageSize: 50 }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Could not load CRM leads. Check the database setup." }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminRequest(request))) return Response.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const parsed = updateLeadSchema.safeParse(await request.json());
    if (!parsed.success) return Response.json({ error: "Invalid lead details." }, { status: 400 });
    const { id, ...updates } = parsed.data;
    if (Object.keys(updates).length === 0) return Response.json({ error: "No changes to save." }, { status: 400 });

    const lead = await updateDemoRequest(id, updates);
    if (!lead) return Response.json({ error: "Lead not found." }, { status: 404 });
    return Response.json({ lead }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Could not save lead changes." }, { status: 503 });
  }
}
