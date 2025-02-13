import { db } from "../../db/drizzle";
import { betterAuth, type BetterAuthOptions } from "better-auth";
import { username, anonymous } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: { enabled: true },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }) => {},
  },
  user: {
    additionalFields: { username: { type: "string", required: false } },
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async (session, request) => {},
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async (session, request) => {},
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      redirectURI: process.env.BASE_URL + "/api/auth/callback/github",
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirectURI: process.env.BASE_URL + "/api/auth/callback/google",
    },
    twitter: {
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      redirectURI: process.env.BASE_URL + "/api/auth/callback/twitter",
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      redirectURI: process.env.BASE_URL + "/api/auth/callback/facebook",
    },
  },
  plugins: [username(), anonymous(), nextCookies()],
} satisfies BetterAuthOptions);

export type Session = typeof auth.$Infer.Session;
