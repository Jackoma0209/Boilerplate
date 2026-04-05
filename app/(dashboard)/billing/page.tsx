import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BillingPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold">Billing</h1>
      <Card>
        <CardHeader>
          <CardTitle>AgentForge Pro</CardTitle>
          <CardDescription>Unlock higher limits, advanced analytics, and premium templates.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <form action="/api/billing/checkout" method="post">
            <Button type="submit">Upgrade with Stripe Checkout</Button>
          </form>
          <form action="/api/billing/portal" method="post">
            <Button variant="outline" type="submit">
              Open Billing Portal
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
