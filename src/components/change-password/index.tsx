"use client";

import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePasswordSchema } from "@/lib/schema/auth";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export function ChangePassword() {
  const [_isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    },
    resolver: zodResolver(updatePasswordSchema),
  });

  const handleChangePassword = async ({
    current_password,
    new_password,
  }: z.infer<typeof updatePasswordSchema>) => {
    const response = await authClient.changePassword({
      currentPassword: current_password,
      newPassword: new_password,
      revokeOtherSessions: true,
    });
    if (response.error) {
      toast.error(response.error.message);
    } else {
      toast.success("Password changed successfully.");
      form.reset();
      setIsOpen(false);
    }
  };

  return (
    <Dialog
      open={_isOpen}
      onOpenChange={(isOpen) => {
        setIsOpen(isOpen);
        if (isOpen) form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Update Password
        </Button>
      </DialogTrigger>
      <DialogContent className="p-8">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-left">Update Password</DialogTitle>
          <DialogDescription>
            For a more secure account, make sure you have a strong password.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit(handleChangePassword)}
          >
            <FormField
              control={form.control}
              name="current_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your current password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your new password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm your new password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : null}
              Change Password
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
