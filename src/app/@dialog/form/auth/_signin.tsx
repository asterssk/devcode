"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { signInWithCredentials } from "./_actions";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { signInSchema } from "@/lib/schema/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

type Props = { className?: string; onRecoveryClick?: () => void };

export function SignInForm({ className, onRecoveryClick }: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    defaultValues: { email_username: "", password: "" },
    resolver: zodResolver(signInSchema),
  });

  return (
    <Form {...form}>
      <form
        className={cn("flex-1 flex flex-col gap-6", className)}
        autoComplete="on"
        onSubmit={form.handleSubmit(async (values) => {
          const error = await signInWithCredentials(values);
          if (error) {
            toast.error(error);
          } else {
            toast.success("Signed in successfully");
            router.back();
          }
        })}
      >
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Sign In</h1>
          <p className="text-sm text-muted-foreground">
            By continuing, you agree to our User Agreement and acknowledge that
            you understand the Privacy Policy.
          </p>
        </div>

        <FormField
          control={form.control}
          name="email_username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address or Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email address or username"
                  {...field}
                  value={field.value}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-start">
                <FormLabel>Password</FormLabel>

                <Button
                  size="fit"
                  className="ml-auto text-xs"
                  tabIndex={-1}
                  variant="link"
                  type="button"
                  onClick={onRecoveryClick}
                >
                  Forgot your password?
                </Button>
              </div>

              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                  value={field.value}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-10 text-md mt-auto"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : null}
          Sign In
        </Button>
      </form>
    </Form>
  );
}
