import z from "zod";

export const collectionSchema = z.object({
  id: z.string().nullish(),
  name: z
    .string({ message: "Please enter collection form" })
    .min(1, "Please enter collection form"),
  parent_id: z.string(),
  visibility: z.enum(["public", "private"], {
    message: "Please select a valid visibility type",
  }),
  slug: z.string().nullish(),
  color: z.string().nullish(),
});

export const collectionClosure = z.object({
  ancestor_id: z.string(),
  descendant_id: z.string(),
  depth: z.number(),
});
