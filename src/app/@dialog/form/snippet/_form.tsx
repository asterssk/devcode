"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { snippetSchema } from "@/lib/schema/snippets";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SnippetEditor } from "./_editor";
import { SnippetBasicFields } from "./_basic";

export function SnippetForm() {
  const form = useForm<z.infer<typeof snippetSchema>>({
    resolver: zodResolver(snippetSchema),
    defaultValues: { visibility: "public", language: "javascript", tags: [] },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        className="flex flex-col flex-1"
      >
        <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_23rem]">
          <SnippetEditor cn={form.control} />

          <SnippetBasicFields cn={form.control} />
        </div>

        <DialogFooter className="border-t border-border px-4 py-3 sticky bottom-0 bg-background">
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
