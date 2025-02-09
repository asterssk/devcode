import z from "zod";
import { monacoLanguageIds } from "../data/monaco-languages";

export const snippetSchema = z.object({
  title: z
    .string({ message: "Please enter snippet title" })
    .min(1, "Please enter snippet title"),
  content: z
    .string({ message: "Snippet content cannot be empty" })
    .min(1, "Snippet content cannot be empty"),
  language: z
    .string({ message: "Please specify snippet language" })
    .refine((value) => monacoLanguageIds.includes(value), {
      message: "Please select a valid language from the list",
    }),
  tags: z.array(z.object({ value: z.string(), label: z.string() }), {
    message: "Invalid tag type",
  }),
  collection_id: z.string().nullish(),
  visibility: z.enum(["public", "private"], {
    message: "Please select a valid visibility type",
  }),
});
