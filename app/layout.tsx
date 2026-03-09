import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3P Digital Growth — Client Dashboard",
  description: "Real-time marketing performance dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
