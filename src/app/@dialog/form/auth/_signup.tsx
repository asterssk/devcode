"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/lib/schema/auth";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpWithCredentials } from "./_actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = { className?: string };

export function SignUpForm({ className }: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(signUpSchema),
  });

  return (
    <Form {...form}>
      <form
        className={cn("h-full flex flex-col gap-6", className)}
        autoComplete="on"
        onSubmit={form.handleSubmit(async (values) => {
          const error = await signUpWithCredentials(values);
          if (error) {
            toast.error(error);
          } else {
            router.back();
          }
        })}
      >
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <p className="text-sm text-muted-foreground">
            By continuing, you agree to our User Agreement and acknowledge that
            you understand the Privacy Policy.
          </p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@email.com"
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter your password"
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
          Create Account
        </Button>
      </form>
    </Form>
  );
}
