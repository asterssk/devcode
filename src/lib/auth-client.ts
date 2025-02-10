import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.BASE_URL as string,
  plugins: [usernameClient()],
});

export type Session = typeof authClient.$Infer.Session;
