import { z } from "zod";

const collection_snippet = z.object({
  collection_id: z.string(),
  snippet_id: z.string(),
});
