import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "dotenv/config";

import * as userSchema from "./schema/user";
import * as authSchema from "./schema/auth";
import * as collectionSchema from "./schema/collection";

const schema = { ...userSchema, ...authSchema, ...collectionSchema };

async function main() {
  const pool = postgres(process.env.DATABASE_URL as string, {
    max: 5,
    idle_timeout: 20,
  });

  const db = drizzle(pool, { schema: schema });

  console.log("SEEDING STARTED!");

  const userId = "qZBOHaLfzqOU4nQEakvaKhGOYTBkmTAs";
  // password
  const password = `6c36516d3612c41d96347991d843803f:956eb3fcae6f16490af7d6076d5714561cf89e24708d7dbd6a502cf68129a59b1e3ded17bdb4575ae30bb16d019fef0d5f538d91ef3162de9241d3d3f6b88702`;

  await db.insert(userSchema.user).values({
    id: userId,
    name: "Teroy",
    email: "sample@email.com",
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(authSchema.account).values({
    id: "SxecVrQcCybtxyQ9IOKorButCBx8NFBY",
    accountId: userId,
    providerId: "credential",
    userId: userId,
    password: password,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log("SEEDING FINISHED!");
}

main()
  .then(() => console.log("SEEDING SUCCESS"))
  .catch(() => console.log("SEEDING ERROR"))
  .finally(() => process.exit(0));
