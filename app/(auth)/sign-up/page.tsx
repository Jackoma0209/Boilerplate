import Link from "next/link";
import { AuthCard } from "@/components/layout/auth-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUpWithPassword } from "@/lib/auth/actions";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <AuthCard title="Create account" description="Start building AI agents in minutes.">
        <form action={signUpWithPassword} className="space-y-4">
          <Input name="fullName" type="text" placeholder="Full name" />
          <Input name="email" type="email" placeholder="Email" required />
          <Input name="password" type="password" placeholder="Password" minLength={8} required />
          {error ? <p className="text-sm text-red-600">{decodeURIComponent(error)}</p> : null}
          <Button className="w-full" type="submit">
            Sign Up
          </Button>
        </form>
        <p className="mt-4 text-sm text-zinc-600">
          Already have an account? <Link className="underline" href="/sign-in">Sign in</Link>
        </p>
      </AuthCard>
    </main>
  );
}
