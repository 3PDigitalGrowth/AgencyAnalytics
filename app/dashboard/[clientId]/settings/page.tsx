"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, ExternalLink } from "lucide-react";

const INTEGRATIONS = [
  { key: "gsc", label: "Google Search Console", color: "#4285F4", description: "Organic search impressions, clicks, CTR and position" },
  { key: "ga", label: "Google Analytics 4", color: "#F9AB00", description: "Sessions, users, conversions and traffic sources" },
  { key: "gads", label: "Google Ads", color: "#34A853", description: "Paid search spend, clicks, conversions and ROAS" },
  { key: "gbp", label: "Google Business Profile", color: "#EA4335", description: "Local views, direction requests, calls and reviews" },
  { key: "meta", label: "Meta Ads", color: "#1877F2", description: "Facebook & Instagram ad performance and ROAS" },
  { key: "clarity", label: "Microsoft Clarity", color: "#742774", description: "Heatmaps, session recordings and user behaviour" },
];

export default function SettingsPage({ params }: { params: { clientId: string } }) {
  const [integrations, setIntegrations] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch(`/api/clients/${params.clientId}/integrations`)
      .then(r => r.json())
      .then(d => {
        const map: Record<string, boolean> = {};
        (d ?? []).forEach((i: any) => { map[i.type.toLowerCase()] = i.isActive; });
        setIntegrations(map);
      })
      .catch(() => {});
  }, [params.clientId]);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-black text-white">Settings</h2>
        <p className="text-sm text-[#606060]">Manage data integrations for this client</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Integrations</CardTitle></CardHeader>
        <div className="space-y-4">
          {INTEGRATIONS.map((integration) => {
            const connected = integrations[integration.key];
            return (
              <div key={integration.key} className="flex items-center justify-between border-b border-[#2A2A2A] pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${integration.color}20` }}>
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: integration.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{integration.label}</p>
                    <p className="text-xs text-[#606060]">{integration.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {connected ? (
                    <span className="flex items-center gap-1 text-xs text-green-400">
                      <CheckCircle size={12} /> Connected
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-[#606060]">
                      <XCircle size={12} /> Not connected
                    </span>
                  )}
                  <button className="flex items-center gap-1 rounded-lg border border-[#2A2A2A] px-3 py-1.5 text-xs text-[#A0A0A0] hover:border-[#FF5722]/40 hover:text-white transition-all">
                    {connected ? "Reconnect" : "Connect"} <ExternalLink size={10} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
