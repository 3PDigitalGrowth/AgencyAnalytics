import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { getGSCMetrics } from "@/lib/api/gsc";
import { prisma } from "@/lib/db/prisma";
import { subDays, format } from "date-fns";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get("clientId")!;
  const range = searchParams.get("range") ?? "28d";

  const days = parseInt(range.replace("d", "").replace("m", "")) * (range.includes("m") ? 30 : 1);
  const endDate = format(new Date(), "yyyy-MM-dd");
  const startDate = format(subDays(new Date(), days), "yyyy-MM-dd");
  const cacheKey = `gsc_${startDate}_${endDate}`;

  // Check cache
  const cached = await prisma.metricCache.findUnique({
    where: { clientId_source_metricKey_dateRange: { clientId, source: "GOOGLE_SEARCH_CONSOLE", metricKey: "overview", dateRange: cacheKey } },
  });
  if (cached && cached.expiresAt > new Date()) {
    return NextResponse.json(cached.data);
  }

  const data = await getGSCMetrics(clientId, startDate, endDate);

  // Cache for 1 hour
  await prisma.metricCache.upsert({
    where: { clientId_source_metricKey_dateRange: { clientId, source: "GOOGLE_SEARCH_CONSOLE", metricKey: "overview", dateRange: cacheKey } },
    update: { data: data as never, cachedAt: new Date(), expiresAt: new Date(Date.now() + 3600000) },
    create: { clientId, source: "GOOGLE_SEARCH_CONSOLE", metricKey: "overview", dateRange: cacheKey, data: data as never, expiresAt: new Date(Date.now() + 3600000) },
  });

  return NextResponse.json(data);
}
