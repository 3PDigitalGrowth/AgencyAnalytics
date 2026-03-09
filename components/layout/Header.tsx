"use client";
import { DateRangePicker } from "@/components/dashboard/DateRangePicker";
import { Bell, ChevronDown } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

interface HeaderProps {
  clientName: string;
  dateRange: string;
  onDateRangeChange: (range: string) => void;
}

export function Header({ clientName, dateRange, onDateRangeChange }: HeaderProps) {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="flex h-14 items-center justify-between border-b border-[#2A2A2A] bg-[#111111] px-6">
      <div>
        <h1 className="text-sm font-bold text-white">{clientName}</h1>
        <p className="text-xs text-[#606060]">Performance Dashboard</p>
      </div>

      <div className="flex items-center gap-3">
        <DateRangePicker value={dateRange} onChange={onDateRangeChange} />

        <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] text-[#606060] hover:text-white transition-colors">
          <Bell size={14} />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-3 py-1.5 hover:border-[#FF5722]/40 transition-colors"
          >
            <div className="h-5 w-5 rounded-full bg-[#FF5722] flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">
                {session?.user?.name?.[0] ?? "U"}
              </span>
            </div>
            <span className="text-xs font-medium text-white">{session?.user?.name ?? "User"}</span>
            <ChevronDown size={12} className="text-[#606060]" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-40 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] py-1 shadow-xl z-50">
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full px-4 py-2 text-left text-xs text-[#A0A0A0] hover:text-white hover:bg-[#222] transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
