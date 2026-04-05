import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AgentForm } from "@/components/agents/agent-form";
import { requireUser } from "@/lib/auth/guards";
import { getAgentForUser } from "@/lib/agents/service";

export default async function EditAgentPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const agent = await getAgentForUser(id, user.id);

  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Edit Agent</CardTitle>
          <CardDescription>Update prompts, tools, and sharing settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <AgentForm
            endpoint={`/api/agents/${id}`}
            method="PATCH"
            initial={{
              name: agent.name,
              description: agent.description || "",
              systemPrompt: agent.system_prompt,
              toolsConfig: Array.isArray(agent.tools_config) ? agent.tools_config.map(String) : [],
              isPublic: agent.is_public,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
