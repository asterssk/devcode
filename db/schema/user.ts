import {
  boolean,
  uniqueIndex,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { collection } from "./collection";
import { relations, SQL, sql } from "drizzle-orm";

export const user = pgTable(
  "user",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
    username: text("username")
      .unique()
      .default(sql`split_part(gen_random_uuid()::text, '-', 5)`),
    isAnonymous: boolean("is_anonymous"),
  },
  (table) => [uniqueIndex("username_idx").on(table.username)]
);

export const profile = pgTable("profile", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  bio: text("bio"),
  socialLinks: jsonb().$type<{ label: string; link: string }[]>(),
  languages: text("languages")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  editorTheme: text("editor_theme"),
});

export const userRelations = relations(user, ({ one, many }) => ({
  profile: one(profile),
  collections: many(collection, { relationName: "collections" }),
}));

export const profileRelations = relations(profile, ({ one }) => ({
  user: one(user, { fields: [profile.userId], references: [user.id] }),
}));
