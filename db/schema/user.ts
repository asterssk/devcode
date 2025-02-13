import {
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { collection } from "./collection";
import { relations, sql } from "drizzle-orm";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  username: text("username"),
  isAnonymous: boolean("is_anonymous"),
});

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
