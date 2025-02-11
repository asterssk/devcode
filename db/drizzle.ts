import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres, { type Sql } from "postgres";

declare global {
  var db: PostgresJsDatabase<typeof schema> | undefined;
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
// const globalPostgresClient = global as unknown as { client: postgres.Sql };

// const queryClient =
//   globalPostgresClient.client ||
//   postgres(process.env.DATABASE_URL as string, {
//     max: 5,
//     idle_timeout: 20,
//   });

// export const db = drizzle(queryClient, { schema: schema });
