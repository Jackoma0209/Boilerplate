import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AgentForm } from "@/components/agents/agent-form";

export default function NewAgentPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Create Agent</CardTitle>
          <CardDescription>Define behavior with a system prompt and optional tools.</CardDescription>
        </CardHeader>
        <CardContent>
          <AgentForm endpoint="/api/agents" method="POST" initial={{ toolsConfig: [] }} />
        </CardContent>
      </Card>
    </div>
  );
}
