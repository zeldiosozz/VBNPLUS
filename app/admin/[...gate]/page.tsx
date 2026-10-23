import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminCrm from "@/components/AdminCrm";

export const metadata: Metadata = {
  title: "Demo Requests CRM | VBN+",
  robots: { index: false, follow: false },
};

export default async function AdminPage({
  params,
}: {
  params: Promise<{ gate: string[] }>;
}) {
  const { gate } = await params;
  const configuredPath = process.env.CRM_ADMIN_PATH;

  if (!configuredPath) notFound();

  const expectedSegments = configuredPath.split("/").filter(Boolean);
  if (
    expectedSegments.length !== gate.length ||
    !expectedSegments.every((segment, index) => segment === gate[index])
  ) {
    notFound();
  }

  return <AdminCrm />;
}
