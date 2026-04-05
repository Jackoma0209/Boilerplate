import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none ring-offset-white placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-black",
        className,
      )}
      {...props}
    />
  );
}
