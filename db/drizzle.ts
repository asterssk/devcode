import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres, { type Sql } from "postgres";

import * as schemaTypes from "./schema/schema_types";
import * as userSchema from "./schema/user";
import * as authSchema from "./schema/auth";
import * as collectionSchema from "./schema/collection";

const schema = {
  ...schemaTypes,
  ...userSchema,
  ...collectionSchema,
  ...authSchema,
};

declare global {
  var db: PostgresJsDatabase<typeof schema>;
  var queryClient: Sql<{}> | undefined;
}

let db: PostgresJsDatabase<typeof schema>;
let queryClient: Sql<{}>;

if (process.env.NODE_ENV === "production") {
  queryClient = postgres(process.env.DATABASE_URL as string, {
    max: 5,
    idle_timeout: 20,
  });

  db = drizzle(queryClient, { schema });
} else {
  if (!global.queryClient || !global.db) {
    global.queryClient = postgres(process.env.DATABASE_URL as string, {
      max: 5,
      idle_timeout: 20,
    });

    global.db = drizzle(global.queryClient, { schema });
  }

  queryClient = global.queryClient;
  db = global.db;
}

export { db, queryClient };
