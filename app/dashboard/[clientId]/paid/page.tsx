"use client";
import { useState, useEffect } from "react";
import { KPICard } from "@/components/dashboard/KPICard";
import { BarChart } from "@/components/charts/BarChart";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, MousePointer, TrendingUp, Target } from "lucide-react";

export default function GoogleAdsPage({ params }: { params: { clientId: string } }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/gads?clientId=${params.clientId}&range=28d`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [params.clientId]);

  const totals = data?.totals?.metrics ?? {};
  const spend = ((totals.cost_micros ?? 0) / 1_000_000).toFixed(2);
  const campaigns = (data?.campaigns ?? []).map((c: any) => ({
    name: c.campaign?.name ?? "Campaign",
    spend: ((c.metrics?.cost_micros ?? 0) / 1_000_000),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Google Ads</h2>
        <p className="text-sm text-[#606060]">Paid search performance — last 28 days</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPICard title="Total Spend" value={spend} prefix="$" icon={<DollarSign size={14} />} color="#34A853" loading={loading} />
        <KPICard title="Clicks" value={totals.clicks ?? 0} icon={<MousePointer size={14} />} color="#34A853" loading={loading} />
        <KPICard title="Conversions" value={Math.round(totals.conversions ?? 0)} icon={<Target size={14} />} color="#34A853" loading={loading} />
        <KPICard title="CTR" value={((totals.ctr ?? 0) * 100).toFixed(2)} suffix="%" icon={<TrendingUp size={14} />} color="#34A853" loading={loading} />
      </div>

      <Card>
        <CardHeader><CardTitle>Spend by Campaign</CardTitle></CardHeader>
        {loading ? (
          <div className="h-[280px] animate-pulse rounded-lg bg-[#2A2A2A]" />
        ) : campaigns.length > 0 ? (
          <BarChart data={campaigns} dataKey="spend" labelKey="name" color="#34A853"
            formatter={(v) => `$${v.toFixed(0)}`} height={280} />
        ) : (
          <div className="flex h-[280px] items-center justify-center text-[#606060] text-sm">
            Connect Google Ads in Settings
          </div>
        )}
      </Card>
    </div>
  );
}
