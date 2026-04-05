import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { requireUser } from "@/lib/auth/guards";
import { getDashboardAnalytics } from "@/lib/analytics/service";

export default async function AnalyticsPage() {
  const user = await requireUser();
  const analytics = await getDashboardAnalytics(user.id);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Usage Analytics</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Agents", analytics.agentsCount],
          ["Chats", analytics.chatsCount],
          ["Messages", analytics.messagesCount],
          ["Token Estimate", analytics.tokensCount],
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
          <CardTitle>Recent Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {analytics.recentEvents.length === 0 ? (
            <p className="text-sm text-zinc-600">No events yet.</p>
          ) : (
            analytics.recentEvents.map((event, index) => (
              <p key={index} className="text-sm">
                {event.event_name} · {new Date(event.created_at).toLocaleString()}
              </p>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
