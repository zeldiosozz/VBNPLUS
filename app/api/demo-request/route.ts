import { z } from "zod";

const demoRequestSchema = z.object({
  packageType: z.enum(["silver", "bronze", "gold"]),
  locale: z.enum(["en", "ar"]),
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(254),
  phoneNumber: z.string().trim().min(7).max(40),
  businessType: z.string().trim().min(2).max(160),
  address: z.string().trim().min(3).max(300),
  message: z.string().trim().max(1500).default(""),
  website: z.string().max(200).optional(),
});

const packages = {
  silver: { en: "Silver", ar: "الفضية", price: "25K EGP/month" },
  bronze: { en: "Bronze", ar: "البرونزية", price: "32K EGP/month" },
  gold: { en: "Gold", ar: "الذهبية", price: "42K EGP/month" },
} as const;

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 12_000) {
    return Response.json({ error: "Request is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > 12_000) {
      return Response.json({ error: "Request is too large." }, { status: 413 });
    }
    body = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = demoRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Please check the submitted information." }, { status: 400 });
  }

  // Silently accept bot submissions caught by the hidden form field.
  if (parsed.data.website) return Response.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.DEMO_REQUEST_TO;
  const sender = process.env.DEMO_REQUEST_FROM;
  if (!apiKey || !recipient || !sender) {
    console.error("Demo request email is not configured.");
    return Response.json({ error: "Request delivery is not configured." }, { status: 503 });
  }

  const { packageType, locale, firstName, lastName, email, phoneNumber, businessType, address, message } = parsed.data;
  const selectedPackage = packages[packageType];
  const packageName = selectedPackage[locale];
  const subject = `Demo request: ${selectedPackage.en} package`;
  const text = [
    `Package: ${packageName}`,
    `Price: ${selectedPackage.price}`,
    `First name: ${firstName}`,
    `Last name: ${lastName}`,
    `Email: ${email}`,
    `Phone: ${phoneNumber}`,
    `Business type: ${businessType}`,
    `Address: ${address}`,
    `Language: ${locale}`,
    message ? `Message: ${message}` : "",
  ].filter(Boolean).join("\n");

  try {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: [email],
        subject,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (!emailResponse.ok) {
      console.error(`Demo request email provider returned ${emailResponse.status}.`);
      return Response.json({ error: "Request delivery failed." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Demo request email delivery failed.", error);
    return Response.json({ error: "Request delivery failed." }, { status: 502 });
  }
}
