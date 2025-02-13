"use server";

import { auth } from "@/lib/auth";
import { signInSchema, signUpSchema } from "@/lib/schema/auth";
import { TSocialProviders } from "@/lib/types";
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

    const username = values.email.split("@")[0];

    await auth.api.signUpEmail({
      body: {
        email: values.email,
        username: username,
        password: values.password,
        name: username,
      },
    });

    revalidatePath("/", "layout");
  } catch {
    return "An unknown error has occurred";
  }
}

export async function signInWithSocialProvider(provider: TSocialProviders) {
  try {
    const response = await auth.api.signInSocial({
      body: { provider: provider },
    });

    console.log("ERROR", response);

    revalidatePath("/", "layout");
  } catch (error) {
    console.log("ERROR", error);
  }
}
