"use client";
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SessionProvider } from "next-auth/react";

interface LayoutProps {
  children: React.ReactNode;
  params: { clientId: string };
}

function DashboardLayoutInner({ children, params }: LayoutProps) {
  const [dateRange, setDateRange] = useState("28d");

  return (
    <div className="flex h-screen overflow-hidden bg-[#111111]">
      <Sidebar clientId={params.clientId} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          clientName="Client Dashboard"
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children, params }: LayoutProps) {
  return (
    <SessionProvider>
      <DashboardLayoutInner params={params}>{children}</DashboardLayoutInner>
    </SessionProvider>
  );
}
