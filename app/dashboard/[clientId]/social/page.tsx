"use client";
import { useState, useEffect } from "react";
import { KPICard } from "@/components/dashboard/KPICard";
import { BarChart } from "@/components/charts/BarChart";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Eye, MousePointer, TrendingUp } from "lucide-react";

export default function MetaAdsPage({ params }: { params: { clientId: string } }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/meta?clientId=${params.clientId}&range=28d`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [params.clientId]);

  const o = data?.overview ?? {};
  const campaigns = (data?.campaigns ?? []).map((c: any) => ({
    name: c.campaign_name ?? "Campaign",
    spend: parseFloat(c.spend ?? 0),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Meta Ads</h2>
        <p className="text-sm text-[#606060]">Facebook & Instagram ad performance — last 28 days</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPICard title="Total Spend" value={parseFloat(o.spend ?? 0).toFixed(2)} prefix="$" icon={<DollarSign size={14} />} color="#1877F2" loading={loading} />
        <KPICard title="Impressions" value={parseInt(o.impressions ?? 0)} icon={<Eye size={14} />} color="#1877F2" loading={loading} />
        <KPICard title="Clicks" value={parseInt(o.clicks ?? 0)} icon={<MousePointer size={14} />} color="#1877F2" loading={loading} />
        <KPICard title="CTR" value={parseFloat(o.ctr ?? 0).toFixed(2)} suffix="%" icon={<TrendingUp size={14} />} color="#1877F2" loading={loading} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Spend by Campaign</CardTitle></CardHeader>
          {loading ? (
            <div className="h-[220px] animate-pulse rounded-lg bg-[#2A2A2A]" />
          ) : campaigns.length > 0 ? (
            <BarChart data={campaigns} dataKey="spend" labelKey="name" color="#1877F2"
              formatter={(v) => `$${v.toFixed(0)}`} />
          ) : (
            <div className="flex h-[220px] items-center justify-center text-[#606060] text-sm">
              Connect Meta Ads in Settings
            </div>
          )}
        </Card>

        <Card>
          <CardHeader><CardTitle>Account Summary</CardTitle></CardHeader>
          <div className="space-y-3 mt-2">
            {[
              { label: "CPM", value: `$${parseFloat(o.cpm ?? 0).toFixed(2)}` },
              { label: "CPC", value: `$${parseFloat(o.cpc ?? 0).toFixed(2)}` },
              { label: "ROAS", value: `${parseFloat(o.roas ?? 0).toFixed(2)}x` },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
                <span className="text-sm text-[#A0A0A0]">{label}</span>
                <span className="text-sm font-semibold text-white">{loading ? "—" : value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
