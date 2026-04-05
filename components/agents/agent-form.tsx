"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type AgentPayload = {
  name: string;
  description: string;
  systemPrompt: string;
  toolsConfig: string[];
  isPublic: boolean;
};

export function AgentForm({
  initial,
  endpoint,
  method,
}: {
  initial?: Partial<AgentPayload>;
  endpoint: string;
  method: "POST" | "PATCH";
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const payload: AgentPayload = {
      name: String(formData.get("name") || ""),
      description: String(formData.get("description") || ""),
      systemPrompt: String(formData.get("systemPrompt") || ""),
      toolsConfig: String(formData.get("toolsConfig") || "")
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean),
      isPublic: formData.get("isPublic") === "on",
    };

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const json = await res.json();
      setError(json.error?.formErrors?.[0] ?? "Failed to save agent");
      setLoading(false);
      return;
    }

    router.push("/agents");
    router.refresh();
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Name</label>
        <Input name="name" defaultValue={initial?.name} required minLength={2} maxLength={80} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Input name="description" defaultValue={initial?.description} maxLength={240} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">System Prompt</label>
        <Textarea
          name="systemPrompt"
          defaultValue={initial?.systemPrompt}
          required
          minLength={20}
          maxLength={8000}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Tools (comma separated)</label>
        <Input
          name="toolsConfig"
          defaultValue={Array.isArray(initial?.toolsConfig) ? initial?.toolsConfig.join(", ") : ""}
          placeholder="web-search, calculator"
        />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input name="isPublic" type="checkbox" defaultChecked={initial?.isPublic} />
        Make this agent public and shareable
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Agent"}
      </Button>
    </form>
  );
}
