import { CRM_SESSION_COOKIE } from "@/lib/crm-auth";

export async function POST() {
  const secure = process.env.NODE_ENV === "production" ? "Secure; " : "";
  return new Response(JSON.stringify({ ok: true }), {
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `${CRM_SESSION_COOKIE}=; HttpOnly; ${secure}SameSite=Strict; Path=/; Max-Age=0`,
    },
  });
}
