import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { ToasterProvider } from "@/components/providers/toaster-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentForge",
  description: "Production-ready AI agent builder SaaS",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
        {children}
        <ToasterProvider />
        <Analytics />
      </body>
    </html>
  );
}
