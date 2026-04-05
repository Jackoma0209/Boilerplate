import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { listPublicTemplates } from "@/lib/agents/service";

export default async function TemplatesPage() {
  const templates = await listPublicTemplates();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Template Gallery</h1>
        <p className="text-zinc-600">Start quickly with battle-tested agent templates.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <CardTitle>{template.title}</CardTitle>
              <CardDescription>{template.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-700">{template.description || "No description"}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
