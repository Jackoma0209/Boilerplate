import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage account preferences and workspace defaults.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-600">More settings controls can be added here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
