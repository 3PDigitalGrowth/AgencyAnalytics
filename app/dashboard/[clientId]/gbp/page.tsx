"use client";
import { useState, useEffect } from "react";
import { KPICard } from "@/components/dashboard/KPICard";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Navigation, Globe, Star } from "lucide-react";

export default function GBPPage({ params }: { params: { clientId: string } }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/gbp?clientId=${params.clientId}&range=28d`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [params.clientId]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-white">Google Business Profile</h2>
        <p className="text-sm text-[#606060]">Local presence & engagement — last 28 days</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPICard title="Profile Views" value={data?.views ?? 0} icon={<MapPin size={14} />} color="#EA4335" loading={loading} />
        <KPICard title="Direction Requests" value={data?.directions ?? 0} icon={<Navigation size={14} />} color="#EA4335" loading={loading} />
        <KPICard title="Call Clicks" value={data?.calls ?? 0} icon={<Phone size={14} />} color="#EA4335" loading={loading} />
        <KPICard title="Website Clicks" value={data?.websiteClicks ?? 0} icon={<Globe size={14} />} color="#EA4335" loading={loading} />
      </div>

      <Card>
        <CardHeader><CardTitle>Reviews</CardTitle></CardHeader>
        <div className="flex items-center gap-4 py-4">
          <div className="text-5xl font-black text-white">{data?.rating ?? "—"}</div>
          <div>
            <div className="flex gap-1 mb-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={16} className={i <= Math.round(data?.rating ?? 0) ? "fill-[#F9AB00] text-[#F9AB00]" : "text-[#2A2A2A]"} />
              ))}
            </div>
            <p className="text-sm text-[#606060]">{data?.reviewCount ?? 0} total reviews</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
