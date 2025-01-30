import z from "zod";

export const collectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  parent_id: z.string(),
  visibility: z.enum(["public", "private"]),
  slug: z.string(),
});

export const collectionClosure = z.object({
  ancestor_id: z.string(),
  descendant_id: z.string(),
  depth: z.number(),
});
