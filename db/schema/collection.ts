import {
  pgTable,
  text,
  timestamp,
  uuid,
  smallint,
  primaryKey,
  check,
  unique,
  uniqueIndex,
  AnyPgColumn,
} from "drizzle-orm/pg-core";
import { user } from "./user";
import { relations, sql } from "drizzle-orm";
import { visibilityEnum } from "./schema_types";

export const collection = pgTable(
  "collection",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    color: text("color"),
    visibility: visibilityEnum().notNull().default("public"),
    slug: text("slug").notNull(),
    parentId: uuid("parent_id").references((): AnyPgColumn => collection.id, {
      onDelete: "cascade",
    }),
    createdBy: text("created_by")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    deletedAt: timestamp("deleted_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at", {
      mode: "date",
      precision: 3,
    }).$onUpdate(() => new Date()),
  },
  (table) => [
    unique().on(table.createdBy, table.parentId, table.name),
    uniqueIndex().on(table.slug, table.createdBy),
  ]
);

export const collectionRelations = relations(collection, ({ one, many }) => ({
  user: one(user, {
    relationName: "userCollections",
    fields: [collection.createdBy],
    references: [user.id],
  }),
  parent: one(collection, {
    fields: [collection.parentId],
    references: [collection.id],
    relationName: "parent_child",
  }),
  children: many(collection, { relationName: "parent_child" }),
}));

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
    primaryKey({ columns: [table.ancestorId, table.descendantId] }),
    check("depth_check", sql`${table.depth} >= 0`),
  ]
);

export const collectionClosureRelations = relations(
  collectionClosure,
  ({ one }) => ({
    ancestor: one(collection, {
      fields: [collectionClosure.ancestorId],
      references: [collection.id],
      relationName: "closure_ancestor",
    }),
    descendant: one(collection, {
      fields: [collectionClosure.descendantId],
      references: [collection.id],
      relationName: "closure_descendant",
    }),
  })
);
