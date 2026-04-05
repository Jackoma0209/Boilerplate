import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-medium text-zinc-600">AgentForge</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Build, launch, and monetize custom AI agents</h1>
        <p className="mt-4 text-zinc-600">
          Create prompt-driven agents with tools, share them instantly, and chat through a polished streaming interface.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button asChild>
            <Link href="/sign-up">Get started</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/templates">Browse templates</Link>
          </Button>
        </div>
      </div>

      <section className="mt-16 grid gap-4 md:grid-cols-3">
        {[
          ["Agent Builder", "Create agents with system prompts and tool configuration."],
          ["Streaming Chat", "Fast, real-time AI responses with persistent conversation history."],
          ["Analytics + Billing", "Track usage and wire Stripe subscriptions for growth."],
        ].map(([title, description]) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
