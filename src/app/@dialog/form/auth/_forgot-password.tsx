"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = { className?: string; onGoBack?: () => void };

export function ForgotPasswordForm({ className, onGoBack }: Props) {
  return (
    <form className={cn("h-full flex flex-col gap-6", className)}>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email address or username and we&apos;ll send you a link to
          reset your password.
        </p>
      </div>

      <Input placeholder="Email or username" required />

      <Button type="submit" className="w-full h-10 text-md">
        Reset Password
      </Button>
    </form>
  );
}
