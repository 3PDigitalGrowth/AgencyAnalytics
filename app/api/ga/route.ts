import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { getGA4Metrics } from "@/lib/api/ga";
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

  const data = await getGA4Metrics(clientId, startDate, endDate);
  return NextResponse.json(data);
}
