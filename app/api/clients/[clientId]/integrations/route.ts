import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";

export async function GET(req: NextRequest, { params }: { params: { clientId: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const integrations = await prisma.integration.findMany({
    where: { clientId: params.clientId },
    select: { type: true, isActive: true, updatedAt: true },
  });
  return NextResponse.json(integrations);
}
