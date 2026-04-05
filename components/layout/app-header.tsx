import Link from "next/link";
import { signOut } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/dashboard" className="font-semibold">
          AgentForge
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/agents">Agents</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/templates">Templates</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/analytics">Analytics</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/billing">Billing</Link>
          </Button>
          <form action={signOut}>
            <Button variant="outline" size="sm" type="submit">
              Sign out
            </Button>
          </form>
        </nav>
      </div>
    </header>
  );
}
