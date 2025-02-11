import { z } from "zod";

export const signInSchema = z.object({
  email_username: z
    .string({ message: "Please enter your email or username" })
    .min(4, "Please enter a valid email or username"),
  password: z
    .string({ message: "Please enter your password" })
    .min(1, "Please enter your password"),
});

export const signUpSchema = z.object({
  email: z
    .string({ message: "Please enter your email address" })
    .min(4, "Please enter a valid email address")
    .email("Email address is badly formatted"),
  password: z
    .string({ message: "Please enter your password" })
    .min(4, "Please enter your password"),
});

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string({ message: "Please enter your current password" })
      .min(1, "Please enter your current password"),
    new_password: z
      .string({ message: "Please enter your new password" })
      .min(6, "Please enter your new password"),
    confirm_new_password: z
      .string({ message: "Please confirm your new password" })
      .min(6, "Please confirm your new password"),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "Passwords don't match",
    path: ["confirm_new_password"],
  });
