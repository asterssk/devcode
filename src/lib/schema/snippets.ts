import z from "zod";

export const snippetSchema = z.object({
  id: z.string().nullish(),
  title: z
    .string({ message: "Please enter snippet title" })
    .min(1, "Please enter snippet title"),
  content: z
    .string({ message: "Snippet content cannot be empty" })
    .min(1, "Snippet content cannot be empty"),
  language: z.string({ message: "Please specify snippet language" }),
  tags: z.array(z.string()),
  visibility: z.enum(["public", "private"], {
    message: "Please select a valid visibility type",
  }),
  slug: z.string().nullish(),
});
