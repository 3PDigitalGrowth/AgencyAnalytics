"use client";
import { useEffect, useState } from "react";
import { KPICard } from "@/components/dashboard/KPICard";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Users, Bot, FileStack, MousePointerClick, Skull, Undo2, ScrollText } from "lucide-react";

type ClarityRow = Record<string, string>;
interface ClarityData {
  numOfDays: number;
  summary: Record<string, ClarityRow>;
}

const PURPLE = "#742774";

// Safely pull a numeric field out of a Clarity metric row.
function num(row: ClarityRow | undefined, field: string): number {
  const v = row?.[field];
  const n = v != null ? parseFloat(v) : NaN;
  return Number.isFinite(n) ? n : 0;
}

export default function ClarityPage({ params }: { params: { clientId: string } }) {
  const { clientId } = params;
  const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  const [data, setData] = useState<ClarityData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const r = await fetch(`/api/clarity?clientId=${clientId}&days=3`);
        const body = await r.json();
        if (!r.ok) throw new Error(body.error ?? `Request failed (${r.status})`);
        if (active) setData(body as ClarityData);
      } catch (e) {
        if (active) setError(e instanceof Error ? e.message : "Request failed");
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [clientId]);

  const traffic = data?.summary?.["Traffic"];
  const isConnected = !error || !error.includes("not connected");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Microsoft Clarity</h2>
        <p className="text-sm text-[#606060]">
          Behaviour insights via Data Export — last {data?.numOfDays ?? 3} days
        </p>
      </div>

      {/* Not-connected state */}
      {error && error.includes("not connected") ? (
        <div className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] flex flex-col items-center justify-center py-20 text-center">
          <div className="h-12 w-12 rounded-xl bg-[#742774]/20 flex items-center justify-center mb-4">
            <span className="text-2xl">👁</span>
          </div>
          <p className="text-sm font-semibold text-white mb-1">Clarity Not Connected</p>
          <p className="text-xs text-[#606060] max-w-sm">
            Add a Clarity Data Export token for this client (as a{" "}
            <code className="text-[#FF5722]">MICROSOFT_CLARITY</code> integration, or via the{" "}
            <code className="text-[#FF5722]">CLARITY_DATA_EXPORT_TOKEN</code> env var) to pull live
            behaviour metrics.
          </p>
        </div>
      ) : (
        <>
          {/* API error (connected but request failed) */}
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              Clarity Data Export error: {error}
            </div>
          )}

          {/* KPI grid */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <KPICard title="Sessions" value={num(traffic, "totalSessionCount")} icon={<Eye size={14} />} color={PURPLE} loading={loading} />
            <KPICard title="Distinct Users" value={num(traffic, "distinctUserCount")} icon={<Users size={14} />} color={PURPLE} loading={loading} />
            <KPICard title="Bot Sessions" value={num(traffic, "totalBotSessionCount")} icon={<Bot size={14} />} color={PURPLE} loading={loading} />
            <KPICard title="Pages / Session" value={num(traffic, "pagesPerSessionPercentage").toFixed(1)} icon={<FileStack size={14} />} color={PURPLE} loading={loading} />
            <KPICard title="Rage Clicks" value={num(data?.summary?.["Rage clicks"], "subTotal")} icon={<MousePointerClick size={14} />} color={PURPLE} loading={loading} />
            <KPICard title="Dead Clicks" value={num(data?.summary?.["Dead clicks"], "subTotal")} icon={<Skull size={14} />} color={PURPLE} loading={loading} />
            <KPICard title="Quick Backs" value={num(data?.summary?.["Quick back"], "subTotal")} icon={<Undo2 size={14} />} color={PURPLE} loading={loading} />
            <KPICard title="Excessive Scrolling" value={num(data?.summary?.["Excessive scrolling"], "subTotal")} icon={<ScrollText size={14} />} color={PURPLE} loading={loading} />
          </div>
        </>
      )}

      {/* Full embedded dashboard (optional, requires project id) */}
      {clarityProjectId && isConnected && (
        <Card>
          <CardHeader>
            <CardTitle>Full Clarity Dashboard</CardTitle>
          </CardHeader>
          <div className="rounded-xl overflow-hidden">
            <iframe
              src={`https://clarity.microsoft.com/projects/view/${clarityProjectId}/dashboard`}
              className="w-full"
              style={{ height: "calc(100vh - 320px)", border: "none" }}
              title="Microsoft Clarity"
            />
          </div>
        </Card>
      )}
    </div>
  );
}
