import { prisma } from "@/lib/db/prisma";

// Microsoft Clarity "Data Export" API.
// Docs: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-data-export
// The Project Live Insights endpoint returns up to the last 3 days of aggregated
// behavioural metrics for the project the Data Export token was generated for.
const CLARITY_API =
  "https://www.clarity.ms/export-data/api/v1/project-live-insights";

// Clarity only exposes 1–3 days via the live-insights export.
const MAX_DAYS = 3;

// Optional breakdown dimensions supported by the API (max 3 per request).
export type ClarityDimension =
  | "Browser"
  | "Device"
  | "Country"
  | "OS"
  | "Source"
  | "Medium"
  | "Campaign"
  | "Channel"
  | "URL";

export interface ClarityMetricRow {
  [key: string]: string;
}

export interface ClarityMetric {
  metricName: string;
  information: ClarityMetricRow[];
}

export interface ClarityResult {
  numOfDays: number;
  metrics: ClarityMetric[];
  /** First information row keyed by metric name, for quick KPI access. */
  summary: Record<string, ClarityMetricRow>;
}

async function getClarityToken(clientId: string): Promise<string> {
  const integration = await prisma.integration.findUnique({
    where: { clientId_type: { clientId, type: "MICROSOFT_CLARITY" } },
  });
  // Prefer a per-client stored token; fall back to a project-wide env token.
  const token = integration?.accessToken ?? process.env.CLARITY_DATA_EXPORT_TOKEN;
  if (!token) throw new Error("Clarity not connected");
  return token;
}

export async function getClarityMetrics(
  clientId: string,
  numOfDays = MAX_DAYS,
  dimensions: ClarityDimension[] = []
): Promise<ClarityResult> {
  const token = await getClarityToken(clientId);
  const days = Math.min(MAX_DAYS, Math.max(1, numOfDays));

  const params = new URLSearchParams({ numOfDays: String(days) });
  dimensions.slice(0, 3).forEach((d, i) => params.append(`dimension${i + 1}`, d));

  const res = await fetch(`${CLARITY_API}?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Clarity API ${res.status}: ${body.slice(0, 200)}`);
  }

  const metrics = (await res.json()) as ClarityMetric[];

  const summary: Record<string, ClarityMetricRow> = {};
  for (const m of metrics ?? []) {
    if (m?.metricName && m.information?.length) {
      summary[m.metricName] = m.information[0];
    }
  }

  return { numOfDays: days, metrics: metrics ?? [], summary };
}
