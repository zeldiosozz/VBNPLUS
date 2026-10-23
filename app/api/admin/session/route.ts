import { isAdminRequest } from "@/lib/crm-auth";

export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) {
    return Response.json({ error: "Unauthorized." }, {
      status: 401,
      headers: { "Cache-Control": "no-store" },
    });
  }

  return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
