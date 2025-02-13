import {
  uniqueIndex,
  pgTable,
  text,
  timestamp,
  uuid,
  smallint,
  primaryKey,
  check,
} from "drizzle-orm/pg-core";
import { user } from "./user";
import { relations, SQL, sql } from "drizzle-orm";
import { visibilityEnum } from "./schema_types";

export const collection = pgTable(
  "collection",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    color: text("color"),
    visibility: visibilityEnum().notNull().default("public"),
    slug: text("slug").notNull().unique(),
    createdBy: text("created_by")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at", {
      mode: "date",
      precision: 3,
    }).$onUpdate(() => new Date()),
  },
  (table) => [uniqueIndex("idx_collection_slug").on(table.slug)]
);

export const collectionClosure = pgTable(
  "collection_closure",
  {
    ancestorId: uuid("ancestor_id")
      .notNull()
      .references(() => collection.id, { onDelete: "cascade" }),
    descendantId: uuid("descendant_id")
      .notNull()
      .references(() => collection.id, { onDelete: "cascade" }),
    depth: smallint().notNull(),
  },
  (table) => [
    primaryKey({
      name: "collection_closure_pks",
      columns: [table.ancestorId, table.descendantId],
    }),
    check("depth_check", sql`${table.depth} >= 0`),
  ]
);

export const collectionRelations = relations(collection, ({ one }) => ({
  user: one(user, { fields: [collection.createdBy], references: [user.id] }),
}));
