import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/auth/guards";
import { getDashboardAnalytics } from "@/lib/analytics/service";

export default async function DashboardPage() {
  const user = await requireUser();
  const analytics = await getDashboardAnalytics(user.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-zinc-600">Simple usage overview for your AgentForge workspace.</p>
        </div>
        <Button asChild>
          <Link href="/agents/new">New Agent</Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Agents", analytics.agentsCount],
          ["Chats", analytics.chatsCount],
          ["Messages", analytics.messagesCount],
          ["Tokens", analytics.tokensCount],
        ].map(([label, value]) => (
          <Card key={String(label)}>
            <CardHeader>
              <CardDescription>{label}</CardDescription>
              <CardTitle>{String(value)}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
          <CardDescription>Latest usage events across your agents.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {analytics.recentEvents.length === 0 ? (
            <p className="text-sm text-zinc-600">No activity yet. Start a chat to see events.</p>
          ) : (
            analytics.recentEvents.map((event, index) => (
              <div key={`${event.id}-${index}`} className="flex items-center justify-between rounded-md border px-3 py-2">
                <p className="text-sm font-medium">{event.event_name}</p>
                <p className="text-xs text-zinc-500">{new Date(event.created_at).toLocaleString()}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
