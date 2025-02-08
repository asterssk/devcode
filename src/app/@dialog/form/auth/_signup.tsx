"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Props = { className?: string };

export function SignUpForm({ className }: Props) {
  return (
    <form className={cn("h-full flex flex-col gap-6", className)}>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Sign Up</h1>
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
        </div>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <Button type="submit" className="w-full h-10 text-md">
        Create Account
      </Button>
    </form>
  );
}
