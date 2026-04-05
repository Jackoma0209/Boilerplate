import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { requireUser } from "@/lib/auth/guards";
import { listMyAgents } from "@/lib/agents/service";

export default async function AgentsPage() {
  const user = await requireUser();
  const agents = await listMyAgents(user.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Your Agents</h1>
          <p className="text-zinc-600">Create and manage your AI agents.</p>
        </div>
        <Button asChild>
          <Link href="/agents/new">New Agent</Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {agents.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No agents yet</CardTitle>
              <CardDescription>Create your first agent to get started.</CardDescription>
            </CardHeader>
          </Card>
        ) : (
          agents.map((agent) => (
            <Card key={agent.id}>
              <CardHeader>
                <CardTitle>{agent.name}</CardTitle>
                <CardDescription>{agent.description || "No description"}</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href={`/agents/${agent.id}/edit`}>Edit</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/chat/${agent.id}`}>Chat</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/agents/${agent.id}/share`}>Share</Link>
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
