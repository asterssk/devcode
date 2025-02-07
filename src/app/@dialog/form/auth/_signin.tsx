"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Props = { className?: string; onRecoveryClick?: () => void };

export function SignInForm({ className, onRecoveryClick }: Props) {
  return (
    <form className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="text-sm text-muted-foreground">
          By continuing, you agree to our User Agreement and acknowledge that
          you understand the Privacy Policy.
        </p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="email@example.com"
          required
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <Button
            size="fit"
            className="ml-auto text-xs"
            variant="link"
            type="button"
            onClick={onRecoveryClick}
          >
            Forgot your password?
          </Button>
        </div>

        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <Button type="submit" className="w-full h-10 text-md">
        Sign In
      </Button>
    </form>
  );
}
