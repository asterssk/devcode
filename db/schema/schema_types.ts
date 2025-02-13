import { pgEnum } from "drizzle-orm/pg-core";

export const visibilityEnum = pgEnum("visibility", ["public", "private"]);
