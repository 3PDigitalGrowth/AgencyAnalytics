"use client";
import { useState, useEffect } from "react";
import { KPICard } from "@/components/dashboard/KPICard";
import { LineChart } from "@/components/charts/LineChart";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ChannelBadge } from "@/components/dashboard/ChannelBadge";
import { Search, BarChart2, Megaphone, MapPin, Eye, MousePointer } from "lucide-react";

interface OverviewPageProps {
  params: { clientId: string };
}

export default function OverviewPage({ params }: OverviewPageProps) {
  const { clientId } = params;
  const [gscData, setGscData] = useState<any>(null);
  const [gaData, setGaData] = useState<any>(null);
  const [metaData, setMetaData] = useState<any>(null);
  const [gadsData, setGadsData] = useState<any>(null);
  const [clarityData, setClarityData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const range = "28d";

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [gsc, ga, meta, gads, clarity] = await Promise.allSettled([
          fetch(`/api/gsc?clientId=${clientId}&range=${range}`).then(r => r.json()),
          fetch(`/api/ga?clientId=${clientId}&range=${range}`).then(r => r.json()),
          fetch(`/api/meta?clientId=${clientId}&range=${range}`).then(r => r.json()),
          fetch(`/api/gads?clientId=${clientId}&range=${range}`).then(r => r.json()),
          fetch(`/api/clarity?clientId=${clientId}&days=3`).then(r => r.ok ? r.json() : null),
        ]);
        if (gsc.status === "fulfilled") setGscData(gsc.value);
        if (ga.status === "fulfilled") setGaData(ga.value);
        if (meta.status === "fulfilled") setMetaData(meta.value);
        if (gads.status === "fulfilled") setGadsData(gads.value);
        if (clarity.status === "fulfilled") setClarityData(clarity.value);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [clientId, range]);

  // Summarise GSC totals
  const gscClicks = gscData?.timeSeries?.reduce((sum: number, r: any) => sum + (r.clicks ?? 0), 0) ?? 0;
  const gscImpressions = gscData?.timeSeries?.reduce((sum: number, r: any) => sum + (r.impressions ?? 0), 0) ?? 0;
  const avgPosition = gscData?.timeSeries?.length
    ? (gscData.timeSeries.reduce((s: number, r: any) => s + (r.position ?? 0), 0) / gscData.timeSeries.length).toFixed(1)
    : "—";

  // GA totals
  const gaSessions = gaData?.overview?.[0]?.metricValues?.[0]?.value ?? 0;
  const gaUsers = gaData?.overview?.[0]?.metricValues?.[1]?.value ?? 0;

  // Meta totals
  const metaSpend = parseFloat(metaData?.overview?.spend ?? "0");
  const metaClicks = parseInt(metaData?.overview?.clicks ?? "0");

  // Gads totals
  const gadsSpend = ((gadsData?.totals?.metrics?.cost_micros ?? 0) / 1_000_000).toFixed(2);

  // Chart data from GSC time series
  const chartData = (gscData?.timeSeries ?? []).map((r: any) => ({
    date: r.keys?.[0]?.slice(5) ?? "",
    Clicks: r.clicks ?? 0,
    Impressions: r.impressions ?? 0,
  }));

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h2 className="text-xl font-black text-white">Overview</h2>
        <p className="text-sm text-[#606060]">All channels — last 28 days</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPICard title="Organic Clicks" value={gscClicks} icon={<Search size={14} />} color="#4285F4" loading={loading} />
        <KPICard title="Impressions" value={gscImpressions} icon={<Search size={14} />} color="#4285F4" loading={loading} />
        <KPICard title="Avg Position" value={avgPosition} icon={<Search size={14} />} color="#4285F4" loading={loading} />
        <KPICard title="Sessions" value={parseInt(gaSessions)} icon={<BarChart2 size={14} />} color="#F9AB00" loading={loading} />
        <KPICard title="Users" value={parseInt(gaUsers)} icon={<BarChart2 size={14} />} color="#F9AB00" loading={loading} />
        <KPICard title="Meta Spend" value={metaSpend} prefix="$" icon={<MousePointer size={14} />} color="#1877F2" loading={loading} />
        <KPICard title="Meta Clicks" value={metaClicks} icon={<MousePointer size={14} />} color="#1877F2" loading={loading} />
        <KPICard title="Google Ads Spend" value={gadsSpend} prefix="$" icon={<Megaphone size={14} />} color="#34A853" loading={loading} />
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Organic Traffic — Clicks & Impressions</CardTitle>
        </CardHeader>
        {loading ? (
          <div className="h-[280px] animate-pulse rounded-lg bg-[#2A2A2A]" />
        ) : chartData.length > 0 ? (
          <LineChart
            data={chartData}
            lines={[
              { key: "Clicks", color: "#FF5722", label: "Clicks" },
              { key: "Impressions", color: "#4285F4", label: "Impressions" },
            ]}
          />
        ) : (
          <div className="flex h-[280px] items-center justify-center text-[#606060] text-sm">
            No GSC data — connect Google Search Console in Settings
          </div>
        )}
      </Card>

      {/* Channel Status */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-[#A0A0A0]">Connected Channels</h3>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
          <ChannelBadge channel="gsc" connected={!!gscData} />
          <ChannelBadge channel="ga" connected={!!gaData} />
          <ChannelBadge channel="gads" connected={!!gadsData} />
          <ChannelBadge channel="meta" connected={!!metaData} />
          <ChannelBadge channel="gbp" connected={false} />
          <ChannelBadge channel="clarity" connected={!!clarityData} />
        </div>
      </div>
    </div>
  );
}
