"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import {
  LayoutDashboard, Search, BarChart2, Megaphone,
  MapPin, Eye, FileText, Settings, ChevronLeft, ChevronRight
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: "" },
  { label: "SEO", icon: Search, href: "/seo" },
  { label: "Analytics", icon: BarChart2, href: "/ga" },
  { label: "Google Ads", icon: Megaphone, href: "/paid" },
  { label: "Meta Ads", icon: Megaphone, href: "/social" },
  { label: "Google Business", icon: MapPin, href: "/gbp" },
  { label: "MS Clarity", icon: Eye, href: "/clarity" },
  { label: "Reports", icon: FileText, href: "/reports" },
];

export function Sidebar({ clientId }: { clientId: string }) {
  const pathname = usePathname();
  const base = `/dashboard/${clientId}`;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      "flex h-screen flex-col border-r border-[#2A2A2A] bg-[#111111] transition-all duration-200",
      collapsed ? "w-16" : "w-56"
    )}>
      {/* Logo */}
      <div className="flex h-14 items-center border-b border-[#2A2A2A] px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-[#FF5722] flex items-center justify-center">
              <span className="text-xs font-black text-white">3P</span>
            </div>
            <span className="text-sm font-bold text-white">3P Digital</span>
          </div>
        )}
        {collapsed && (
          <div className="h-7 w-7 rounded-lg bg-[#FF5722] flex items-center justify-center mx-auto">
            <span className="text-xs font-black text-white">3P</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {navItems.map((item) => {
          const href = `${base}${item.href}`;
          const active = pathname === href || (item.href === "" && pathname === base);
          return (
            <Link
              key={item.href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-[#FF5722]/15 text-[#FF5722]"
                  : "text-[#606060] hover:bg-[#1A1A1A] hover:text-white"
              )}
            >
              <item.icon size={16} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-[#2A2A2A] p-2 space-y-0.5">
        <Link
          href={`${base}/settings`}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#606060] hover:bg-[#1A1A1A] hover:text-white transition-all"
        >
          <Settings size={16} className="shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#606060] hover:bg-[#1A1A1A] hover:text-white transition-all"
        >
          {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span>Collapse</span></>}
        </button>
      </div>
    </aside>
  );
}
