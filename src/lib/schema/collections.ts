import z from "zod";

export const collectionSchema = z.object({
  id: z.string().nullish(),
  name: z
    .string({ message: "Please enter collection name" })
    .min(1, "Please enter collection name"),
  visibility: z.enum(["public", "private"], {
    message: "Please select a valid visibility type",
  }),
  slug: z.string().nullish(),
  color: z.string().nullish(),
});

// Backebd only
export const collectionClosure = z.object({
  ancestor_id: z.string(),
  descendant_id: z.string(),
  depth: z.number().min(0, "Please enter a valid depth"),
  // PRIMARY KEY (ancestor_id, descendant_id)
});
