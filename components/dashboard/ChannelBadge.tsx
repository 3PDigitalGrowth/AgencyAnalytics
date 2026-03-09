"use client";
import { cn } from "@/lib/utils/cn";

const channels = {
  gsc: { label: "Search Console", color: "#4285F4", dot: "bg-[#4285F4]" },
  ga: { label: "Analytics", color: "#F9AB00", dot: "bg-[#F9AB00]" },
  gads: { label: "Google Ads", color: "#34A853", dot: "bg-[#34A853]" },
  gbp: { label: "Business Profile", color: "#EA4335", dot: "bg-[#EA4335]" },
  meta: { label: "Meta Ads", color: "#1877F2", dot: "bg-[#1877F2]" },
  clarity: { label: "MS Clarity", color: "#742774", dot: "bg-[#742774]" },
} as const;

type Channel = keyof typeof channels;

export function ChannelBadge({ channel, connected }: { channel: Channel; connected: boolean }) {
  const c = channels[channel];
  return (
    <div className="flex items-center gap-2 rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-3 py-2">
      <span className={cn("h-2 w-2 rounded-full", connected ? c.dot : "bg-[#2A2A2A]")} />
      <span className="text-xs font-medium text-[#A0A0A0]">{c.label}</span>
      <span className={cn("ml-auto text-xs", connected ? "text-green-400" : "text-[#606060]")}>
        {connected ? "Live" : "Not connected"}
      </span>
    </div>
  );
}
