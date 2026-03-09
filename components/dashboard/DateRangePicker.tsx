"use client";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

const ranges = [
  { label: "7 Days", value: "7d" },
  { label: "28 Days", value: "28d" },
  { label: "30 Days", value: "30d" },
  { label: "90 Days", value: "90d" },
  { label: "12 Months", value: "12m" },
];

interface DateRangePickerProps {
  value: string;
  onChange: (range: string) => void;
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  return (
    <div className="flex items-center gap-1 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-1">
      {ranges.map((r) => (
        <button
          key={r.value}
          onClick={() => onChange(r.value)}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
            value === r.value
              ? "bg-[#FF5722] text-white"
              : "text-[#A0A0A0] hover:text-white"
          )}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
