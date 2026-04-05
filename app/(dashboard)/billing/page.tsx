import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BillingActions } from "@/components/billing/billing-actions";

export default function BillingPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold">Billing</h1>
      <Card>
        <CardHeader>
          <CardTitle>AgentForge Pro</CardTitle>
          <CardDescription>Unlock higher limits, advanced analytics, and premium templates.</CardDescription>
        </CardHeader>
        <CardContent>
          <BillingActions />
        </CardContent>
      </Card>
    </div>
  );
}
