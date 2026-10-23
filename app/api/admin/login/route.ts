import { createAdminSession, isAdminPasswordValid, CRM_SESSION_COOKIE } from "@/lib/crm-auth";
import { isCrmAdminActive } from "@/lib/demo-requests-db";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { username?: unknown; password?: unknown };
    if (
      typeof body.username !== "string" ||
      body.username.trim().length < 2 ||
      body.username.length > 80 ||
      typeof body.password !== "string" ||
      body.password.length > 512 ||
      (process.env.NODE_ENV === "production" && (process.env.CRM_ADMIN_PASSWORD?.length ?? 0) < 12) ||
      !isAdminPasswordValid(body.password)
    ) {
      if (process.env.NODE_ENV === "production" && (process.env.CRM_ADMIN_PASSWORD?.length ?? 0) < 12) {
        return Response.json({ error: "Set a strong admin password (at least 12 characters) before production sign-in." }, { status: 503 });
      }
      return Response.json({ error: "Incorrect username or password." }, { status: 401 });
    }

    const username = body.username.trim().toLowerCase();
    if (!/^[a-z0-9._-]{2,80}$/.test(username) || !(await isCrmAdminActive(username))) {
      return Response.json({ error: "Incorrect username or password." }, { status: 401 });
    }

    const secure = new URL(request.url).protocol === "https:" || process.env.NODE_ENV === "production";
    const response = Response.json({ ok: true });
    response.headers.append(
      "Set-Cookie",
      `${CRM_SESSION_COOKIE}=${createAdminSession(username)}; HttpOnly; ${secure ? "Secure; " : ""}SameSite=Strict; Path=/; Max-Age=43200`,
    );
    return response;
  } catch (error) {
    console.error("Could not verify CRM admin credentials.", error);
    return Response.json({ error: "Admin sign-in is unavailable. Check the Supabase CRM admin table setup." }, { status: 503 });
  }
}
