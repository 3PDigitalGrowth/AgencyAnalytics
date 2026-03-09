"use client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  prefix?: string;
  suffix?: string;
  color?: string;
  icon?: React.ReactNode;
  loading?: boolean;
}

export function KPICard({ title, value, change, prefix, suffix, color = "#FF5722", icon, loading }: KPICardProps) {
  const isPositive = (change ?? 0) > 0;
  const isNeutral = change === 0 || change === undefined;

  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="h-4 w-24 rounded bg-[#2A2A2A] mb-3" />
        <div className="h-8 w-32 rounded bg-[#2A2A2A] mb-2" />
        <div className="h-3 w-16 rounded bg-[#2A2A2A]" />
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden group hover:border-[#FF5722]/30 transition-colors">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: `radial-gradient(circle at top left, ${color}08, transparent 60%)` }} />
      
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#606060]">{title}</p>
        {icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${color}20`, color }}>
            {icon}
          </div>
        )}
      </div>

      <p className="text-2xl font-black text-white tracking-tight">
        {prefix}{typeof value === "number" ? value.toLocaleString() : value}{suffix}
      </p>

      {change !== undefined && (
        <div className={cn("mt-2 flex items-center gap-1 text-xs font-medium",
          isPositive ? "text-green-400" : isNeutral ? "text-[#606060]" : "text-red-400")}>
          {isNeutral ? <Minus size={12} /> : isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{isPositive ? "+" : ""}{change?.toFixed(1)}% vs prev period</span>
        </div>
      )}
    </Card>
  );
}
