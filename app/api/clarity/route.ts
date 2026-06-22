import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { getClarityMetrics } from "@/lib/api/clarity";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get("clientId")!;
  // Clarity's live-insights export only covers the last 1–3 days; clamp in the lib.
  const numOfDays = parseInt(searchParams.get("days") ?? "3", 10);

  try {
    const data = await getClarityMetrics(clientId, numOfDays);
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    const status = message.includes("not connected") ? 404 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
