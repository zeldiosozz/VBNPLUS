import { createHmac, createHash, timingSafeEqual } from "node:crypto";
import { isCrmAdminActive } from "@/lib/demo-requests-db";

export const CRM_SESSION_COOKIE = "vbn_crm_session";
const SESSION_LIFETIME_SECONDS = 60 * 60 * 12;

export async function isAdminRequest(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const session = cookieHeader.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${CRM_SESSION_COOKIE}=`));
  const username = getValidSessionUsername(session?.slice(CRM_SESSION_COOKIE.length + 1));
  if (!username) return false;
  try {
    return await isCrmAdminActive(username);
  } catch {
    return false;
  }
}

function sessionSecret() {
  const secret = process.env.CRM_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("CRM_SESSION_SECRET must contain at least 32 characters.");
  }
  return secret;
}

function sign(username: string, expiresAt: string) {
  const password = process.env.CRM_ADMIN_PASSWORD;
  if (!password) throw new Error("CRM_ADMIN_PASSWORD is not configured.");
  // Bind sessions to the configured password and username, so password changes
  // invalidate all sessions and account identities cannot be swapped in a cookie.
  return createHmac("sha256", sessionSecret())
    .update(password).update("\0").update(username).update("\0").update(expiresAt).digest("hex");
}

export function isAdminPasswordValid(password: string) {
  const expectedPassword = process.env.CRM_ADMIN_PASSWORD;
  if (!expectedPassword) throw new Error("CRM_ADMIN_PASSWORD is not configured.");
  const expected = createHash("sha256").update(expectedPassword).digest();
  const actual = createHash("sha256").update(password).digest();
  return timingSafeEqual(actual, expected);
}

export function createAdminSession(username: string) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_LIFETIME_SECONDS;
  const normalizedUsername = username.trim().toLowerCase();
  const encodedUsername = Buffer.from(normalizedUsername).toString("base64url");
  return `${expiresAt}.${encodedUsername}.${sign(normalizedUsername, String(expiresAt))}`;
}

function getValidSessionUsername(value: string | undefined) {
  if (!value) return null;
  const [expiresAtText, encodedUsername, signature, ...extra] = value.split(".");
  if (!expiresAtText || !encodedUsername || !signature || extra.length || !/^\d+$/.test(expiresAtText)) return null;
  const expiresAt = Number(expiresAtText);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return null;

  try {
    const username = Buffer.from(encodedUsername, "base64url").toString("utf8");
    if (!username || username !== username.trim().toLowerCase()) return null;
    const expected = Buffer.from(sign(username, expiresAtText), "hex");
    const actual = Buffer.from(signature, "hex");
    return actual.length === expected.length && timingSafeEqual(actual, expected) ? username : null;
  } catch {
    return null;
  }
}

