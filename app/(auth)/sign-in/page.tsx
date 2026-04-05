import Link from "next/link";
import { AuthCard } from "@/components/layout/auth-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInWithPassword } from "@/lib/auth/actions";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <AuthCard title="Welcome back" description="Sign in to your AgentForge account.">
        <form action={signInWithPassword} className="space-y-4">
          <Input name="email" type="email" placeholder="Email" required />
          <Input name="password" type="password" placeholder="Password" required />
          {error ? <p className="text-sm text-red-600">{decodeURIComponent(error)}</p> : null}
          <Button className="w-full" type="submit">
            Sign In
          </Button>
        </form>
        <p className="mt-4 text-sm text-zinc-600">
          No account? <Link className="underline" href="/sign-up">Create one</Link>
        </p>
      </AuthCard>
    </main>
  );
}
