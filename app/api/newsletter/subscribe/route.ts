import { z } from "zod";
import { saveNewsletterSubscriber } from "@/lib/demo-requests-db";

const newsletterSchema = z.object({
  email: z.string().trim().email().max(254),
  locale: z.enum(["en", "ar"]),
  website: z.string().max(200).optional(),
});

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 4_000) {
    return Response.json({ error: "Request is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > 4_000) {
      return Response.json({ error: "Request is too large." }, { status: 413 });
    }
    body = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  // Silently accept automated submissions caught by the hidden form field.
  if (parsed.data.website) return Response.json({ ok: true });

  try {
    await saveNewsletterSubscriber(parsed.data.email, parsed.data.locale);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "We could not save your subscription. Please try again." }, { status: 503 });
  }
}
