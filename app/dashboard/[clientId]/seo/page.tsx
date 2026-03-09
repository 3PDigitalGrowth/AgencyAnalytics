"use client";
import { useState, useEffect } from "react";
import { KPICard } from "@/components/dashboard/KPICard";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, TrendingUp, MousePointer, Eye } from "lucide-react";

export default function SEOPage({ params }: { params: { clientId: string } }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/gsc?clientId=${params.clientId}&range=28d`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [params.clientId]);

  const totals = {
    clicks: data?.timeSeries?.reduce((s: number, r: any) => s + r.clicks, 0) ?? 0,
    impressions: data?.timeSeries?.reduce((s: number, r: any) => s + r.impressions, 0) ?? 0,
    ctr: data?.timeSeries?.length
      ? ((data.timeSeries.reduce((s: number, r: any) => s + r.ctr, 0) / data.timeSeries.length) * 100).toFixed(2)
      : 0,
    position: data?.timeSeries?.length
      ? (data.timeSeries.reduce((s: number, r: any) => s + r.position, 0) / data.timeSeries.length).toFixed(1)
      : 0,
  };

  const chartData = (data?.timeSeries ?? []).map((r: any) => ({
    date: r.keys?.[0]?.slice(5) ?? "",
    Clicks: r.clicks,
    Impressions: r.impressions,
  }));

  const topPages = (data?.topPages ?? []).map((r: any) => ({
    page: r.keys?.[0]?.replace(/^https?:\/\/[^/]+/, "") ?? "",
    clicks: r.clicks,
  }));

  const topQueries = (data?.topQueries ?? []).map((r: any) => ({
    query: r.keys?.[0] ?? "",
    clicks: r.clicks,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">SEO — Search Console</h2>
        <p className="text-sm text-[#606060]">Organic search performance — last 28 days</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPICard title="Total Clicks" value={totals.clicks} icon={<MousePointer size={14} />} color="#4285F4" loading={loading} />
        <KPICard title="Impressions" value={totals.impressions} icon={<Eye size={14} />} color="#4285F4" loading={loading} />
        <KPICard title="Avg CTR" value={totals.ctr} suffix="%" icon={<TrendingUp size={14} />} color="#4285F4" loading={loading} />
        <KPICard title="Avg Position" value={totals.position} icon={<Search size={14} />} color="#4285F4" loading={loading} />
      </div>

      <Card>
        <CardHeader><CardTitle>Clicks & Impressions Over Time</CardTitle></CardHeader>
        {loading ? (
          <div className="h-[280px] animate-pulse rounded-lg bg-[#2A2A2A]" />
        ) : (
          <LineChart data={chartData} lines={[
            { key: "Clicks", color: "#FF5722", label: "Clicks" },
            { key: "Impressions", color: "#4285F4", label: "Impressions" },
          ]} />
        )}
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Top Pages by Clicks</CardTitle></CardHeader>
          {loading ? (
            <div className="h-[220px] animate-pulse rounded-lg bg-[#2A2A2A]" />
          ) : (
            <BarChart data={topPages} dataKey="clicks" labelKey="page" color="#FF5722" />
          )}
        </Card>
        <Card>
          <CardHeader><CardTitle>Top Queries by Clicks</CardTitle></CardHeader>
          {loading ? (
            <div className="h-[220px] animate-pulse rounded-lg bg-[#2A2A2A]" />
          ) : (
            <BarChart data={topQueries} dataKey="clicks" labelKey="query" color="#4285F4" />
          )}
        </Card>
      </div>
    </div>
  );
}
