import { isAdminRequest } from "@/lib/crm-auth";
import { addDemoRequestActivity, getDemoRequestActivities } from "@/lib/demo-requests-db";

type RouteParams = { params: Promise<{ id: string }> };
const uuidPattern = /^[0-9a-f-]{36}$/i;

export async function GET(request: Request, { params }: RouteParams) {
  if (!(await isAdminRequest(request))) return Response.json({ error: "Unauthorized." }, { status: 401 });
  const { id } = await params;
  if (!uuidPattern.test(id)) return Response.json({ error: "Invalid lead." }, { status: 400 });
  try {
    const activities = await getDemoRequestActivities(id);
    return Response.json({ activities }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Could not load this lead's activity." }, { status: 503 });
  }
}

export async function POST(request: Request, { params }: RouteParams) {
  if (!(await isAdminRequest(request))) return Response.json({ error: "Unauthorized." }, { status: 401 });
  const { id } = await params;
  if (!uuidPattern.test(id)) return Response.json({ error: "Invalid lead." }, { status: 400 });
  try {
    const body = (await request.json()) as { details?: unknown };
    if (typeof body.details !== "string" || body.details.trim().length < 1 || body.details.length > 2000) {
      return Response.json({ error: "Notes must be between 1 and 2,000 characters." }, { status: 400 });
    }
    const activity = await addDemoRequestActivity(id, "note", body.details.trim());
    if (!activity) return Response.json({ error: "Could not save note." }, { status: 503 });
    return Response.json({ activity }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Could not save note." }, { status: 503 });
  }
}
