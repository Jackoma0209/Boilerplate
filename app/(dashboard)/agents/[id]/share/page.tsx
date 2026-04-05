import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/auth/guards";
import { getAgentForUser } from "@/lib/agents/service";

export default async function ShareAgentPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const agent = await getAgentForUser(id, user.id);
  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/chat/${agent.id}`;

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Share {agent.name}</CardTitle>
          <CardDescription>Public agents can be shared with this URL.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="rounded-md border bg-zinc-50 p-3 text-sm">{shareUrl}</p>
          <Button asChild>
            <Link href={`/chat/${agent.id}`}>Open chat</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
