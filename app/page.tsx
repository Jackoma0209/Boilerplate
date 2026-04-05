import Link from "next/link";
import { CheckCircle2, PlayCircle, Sparkles, Users, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Build agents in minutes",
    description: "Create custom agents with prompts + tools, then publish and share instantly.",
    icon: Sparkles,
  },
  {
    title: "Run your AI team",
    description: "Deploy multiple role-specific agents for research, marketing, support, and ops.",
    icon: Users,
  },
  {
    title: "Production-ready workflows",
    description: "Streaming chat, analytics, and billing-ready foundations for shipping real SaaS products.",
    icon: Workflow,
  },
];

const pricing = [
  {
    name: "Starter",
    price: "$0",
    description: "Perfect for testing ideas",
    bullets: ["Up to 3 agents", "Basic analytics", "Template gallery access"],
    cta: "Start free",
    href: "/sign-up",
  },
  {
    name: "Pro",
    price: "$29",
    description: "For creators launching products",
    bullets: ["Unlimited agents", "Advanced usage insights", "Priority support"],
    cta: "Upgrade to Pro",
    href: "/billing",
    featured: true,
  },
  {
    name: "Team",
    price: "$99",
    description: "For growing AI-first teams",
    bullets: ["Multi-workspace setup", "Custom onboarding", "Shared team analytics"],
    cta: "Talk to sales",
    href: "mailto:sales@agentforge.app",
  },
];

const testimonials = [
  {
    quote:
      "We launched a client-ready AI assistant in one afternoon. AgentForge cut our build time by 80%.",
    author: "Mina K.",
    role: "Founder, GrowthPilot",
  },
  {
    quote:
      "The template gallery and streaming chat UX made it easy to ship a polished MVP quickly.",
    author: "Daryl T.",
    role: "Indie Maker",
  },
  {
    quote:
      "Finally a starter that feels production-ready, not just a demo project.",
    author: "Priya S.",
    role: "Product Engineer",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl space-y-20 px-4 py-12 sm:py-16">
      <section className="space-y-8 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1 text-sm text-zinc-700">
          <Sparkles className="h-4 w-4" /> AgentForge MVP
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Launch your own AI team in 60 seconds
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-zinc-600">
          Build, customize, and monetize AI agents with a beautiful chat UI, prebuilt templates, and SaaS-ready billing.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/sign-up">Launch AgentForge</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/templates">Explore templates</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden border-zinc-300">
          <CardHeader>
            <CardTitle className="text-xl">Product demo</CardTitle>
            <CardDescription>Preview how quickly teams launch tailored AI agents.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-100">
              <div className="text-center">
                <PlayCircle className="mx-auto mb-2 h-10 w-10 text-zinc-500" />
                <p className="text-sm text-zinc-600">Demo video placeholder</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-300">
          <CardHeader>
            <CardTitle className="text-xl">Why AgentForge</CardTitle>
            <CardDescription>Everything needed to ship an agent business fast.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Auth + Postgres", "Streaming chat", "Template gallery", "Usage analytics", "Stripe-ready billing"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-zinc-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold">Core features</h2>
          <p className="mt-2 text-zinc-600">Built for speed, quality, and launch-readiness.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="h-5 w-5 text-zinc-700" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold">Pricing tiers</h2>
          <p className="mt-2 text-zinc-600">Simple plans for builders, pros, and teams.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {pricing.map((plan) => (
            <Card key={plan.name} className={plan.featured ? "border-black shadow-sm" : undefined}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <p className="text-3xl font-bold">{plan.price}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm text-zinc-700">
                  {plan.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full" variant={plan.featured ? "default" : "outline"}>
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold">Loved by early teams</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author}>
              <CardHeader>
                <CardDescription className="text-base text-zinc-700">“{testimonial.quote}”</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-sm text-zinc-600">{testimonial.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-black bg-black px-6 py-10 text-center text-white sm:px-12">
        <h2 className="text-3xl font-semibold">Launch your own AI team in 60 seconds</h2>
        <p className="mx-auto mt-3 max-w-2xl text-zinc-300">
          Start from proven templates, customize your agents, and go live with checkout-ready billing.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="secondary" size="lg">
            <Link href="/sign-up">Start building now</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-zinc-500 text-white hover:bg-zinc-900">
            <Link href="/dashboard">See dashboard</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
