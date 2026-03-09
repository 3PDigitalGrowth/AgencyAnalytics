import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";

export default async function DashboardRootPage() {
  const session = await auth();
  if (!session) redirect("/login");

  if (session.user.role === "AGENCY") {
    const firstClient = await prisma.client.findFirst({ orderBy: { createdAt: "asc" } });
    if (firstClient) redirect(`/dashboard/${firstClient.slug}`);
    redirect("/admin/clients");
  }

  if (session.user.clientId) {
    const client = await prisma.client.findUnique({ where: { id: session.user.clientId } });
    if (client) redirect(`/dashboard/${client.slug}`);
  }

  redirect("/login");
}
