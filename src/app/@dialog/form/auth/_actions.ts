"use server";

import { auth } from "@/lib/auth";
import { signInSchema, signUpSchema } from "@/lib/schema/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function signInWithCredentials(
  values: z.infer<typeof signInSchema>
) {
  try {
    const validation = signInSchema.safeParse(values);

    if (!validation.success) {
      return "Please fill-in your signin credentials correctly.";
    }

    if (values.email_username.includes("@")) {
      await auth.api.signInEmail({
        body: { email: values.email_username, password: values.password },
      });
    } else {
      await auth.api.signInUsername({
        body: { username: values.email_username, password: values.password },
      });
    }

    revalidatePath("/", "layout");
  } catch {
    return "Unauthorized: Invalid user credentials";
  }
}

export async function signUpWithCredentials(
  values: z.infer<typeof signUpSchema>
) {
  try {
    const validation = signUpSchema.safeParse(values);

    if (!validation.success) {
      return "Please fill-in your signup credentials correctly.";
    }

    await auth.api.signUpEmail({
      body: {
        email: values.email,
        username: values.email,
        password: values.password,
        name: values.email.split("@").at(0) ?? "",
      },
    });

    revalidatePath("/", "layout");
  } catch {
    return "An unknown error has occurred";
  }
}
