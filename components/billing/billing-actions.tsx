"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

async function postAndRedirect(url: string) {
  const res = await fetch(url, { method: "POST" });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Request failed");
  if (json.url) window.location.href = json.url;
}

export function BillingActions() {
  const [loading, setLoading] = useState<"checkout" | "portal" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const statusMessage = useMemo(() => {
    if (searchParams.get("success") === "1") return "Checkout completed in Stripe test mode.";
    if (searchParams.get("canceled") === "1") return "Checkout canceled.";
    return null;
  }, [searchParams]);

  return (
    <div className="space-y-3">
      <p className="text-sm text-zinc-600">Use Stripe test mode keys and test card 4242 4242 4242 4242.</p>

      <Button
        type="button"
        disabled={loading !== null}
        onClick={async () => {
          try {
            setError(null);
            setLoading("checkout");
            await postAndRedirect("/api/billing/checkout");
          } catch (e) {
            setError(e instanceof Error ? e.message : "Failed to start checkout");
          } finally {
            setLoading(null);
          }
        }}
      >
        {loading === "checkout" ? "Opening checkout..." : "Upgrade with Stripe Checkout"}
      </Button>

      <Button
        variant="outline"
        type="button"
        disabled={loading !== null}
        onClick={async () => {
          try {
            setError(null);
            setLoading("portal");
            await postAndRedirect("/api/billing/portal");
          } catch (e) {
            setError(e instanceof Error ? e.message : "Failed to open portal");
          } finally {
            setLoading(null);
          }
        }}
      >
        {loading === "portal" ? "Opening portal..." : "Open Billing Portal"}
      </Button>

      {statusMessage ? <p className="text-sm text-emerald-700">{statusMessage}</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
