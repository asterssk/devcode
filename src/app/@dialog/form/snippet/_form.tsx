"use client";

import React from "react";
import { z } from "zod";
import { snippetSchema } from "@/lib/schema/snippets";
import { useForm } from "@tanstack/react-form";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Editor } from "@monaco-editor/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import MultipleSelector from "@/components/ui/multiselect";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { monacoLanguages } from "@/lib/data/monaco-languages";
import { TanstackFormErrorList } from "@/components/tanstack-errors";
import { saveCodeSnippet } from "./_actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SnippetForm() {
  const router = useRouter();

  const form = useForm<Partial<z.infer<typeof snippetSchema>>>({
    defaultValues: { language: "javascript", visibility: "public", tags: [] },
    validators: { onBlur: snippetSchema },
    onSubmit: async ({ value }) => {
      const errors = await saveCodeSnippet(value);

      if (!errors) {
        toast.success("Code snippet uploaded", { position: "top-right" });
        router.back();
      } else {
        errors.forEach((error) => {
          toast.error(error, { position: "top-right" });
        });
      }
    },
    // transform: useTransform((base) => mergeForm(base, state ?? {}), [state]),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col flex-1"
    >
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_23rem]">
        <form.Subscribe selector={(state) => state.values.language}>
          {(lang) => (
            <form.Field name="content">
              {(field) => (
                <Editor
                  className="border-r"
                  loading={<div>Loading...</div>}
                  language={lang}
                  defaultLanguage="javascript"
                  defaultValue="// Write your code here"
                  onChange={field.handleChange}
                  value={field.state.value}
                  // theme={theme === "light" ? "light" : "vs-dark"}
                />
              )}
            </form.Field>
          )}
        </form.Subscribe>

        <div className="flex flex-col gap-2 md:gap-4 p-4 border-t md:border-t-0">
          <TanstackFormErrorList form={form} />

          <form.Field name="title">
            {(field) => (
              <div className="grid gap-2">
                <Label htmlFor="_title">Title</Label>
                <Input
                  id="_title"
                  name={field.name}
                  defaultValue={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter snippet title"
                />

                {field.state.meta.errors.map((error) => (
                  <p key={error as string} className="error">
                    {error}
                  </p>
                ))}
              </div>
            )}
          </form.Field>

          <form.Field name="tags">
            {(field) => (
              <div className="grid gap-2">
                <Label htmlFor="_tags">Tags</Label>
                <MultipleSelector
                  inputProps={{ id: "_tags" }}
                  commandProps={{ label: "Select tags" }}
                  defaultOptions={[{ label: "aw", value: "aw" }]}
                  placeholder="Select tags"
                  value={field.state.value}
                  onChange={field.handleChange}
                  hidePlaceholderWhenSelected
                />

                {field.state.meta.errors.map((error) => (
                  <p key={error as string} className="error">
                    {error}
                  </p>
                ))}
              </div>
            )}
          </form.Field>

          <div className="grid md:grid-cols-2 gap-4">
            <form.Field name="language">
              {(field) => (
                <div className="grid gap-2">
                  <Label htmlFor="_language">Language</Label>
                  <Select
                    name={field.name}
                    defaultValue={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger id="_language">
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      {monacoLanguages.map((language) => (
                        <SelectItem key={language.id} value={language.id}>
                          {language.aliases?.at(0) ?? language.id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {field.state.meta.errors.map((error) => (
                    <p key={error as string} className="error">
                      {error}
                    </p>
                  ))}
                </div>
              )}
            </form.Field>

            <form.Field name="visibility">
              {(field) => (
                <div className="grid gap-2">
                  <Label htmlFor="_visibility">Visibility</Label>
                  <Select
                    name={field.name}
                    defaultValue={field.state.value}
                    onValueChange={(e: "public" | "private") => {
                      field.handleChange(e);
                    }}
                  >
                    <SelectTrigger id="_visibility">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>

                  {field.state.meta.errors.map((error) => (
                    <p key={error as string} className="error">
                      {error}
                    </p>
                  ))}
                </div>
              )}
            </form.Field>
          </div>
        </div>
      </div>

      <DialogFooter className="border-t border-border px-4 py-3 sticky bottom-0 bg-background">
        <Button
          type="reset"
          variant="secondary"
          className="mr-4"
          onClick={() => form.reset()}
        >
          Reset
        </Button>

        <form.Subscribe selector={(state) => [state.isSubmitting]}>
          {([isSubmitting]) => (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="animate-spin" /> : null}
              Save changes
            </Button>
          )}
        </form.Subscribe>
      </DialogFooter>
    </form>
  );
}
