"use client";

import React from "react";
import { z } from "zod";
import { snippetSchema } from "@/lib/schema/snippets";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Editor } from "@monaco-editor/react";
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
import { saveCodeSnippet } from "./_actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useQueryState } from "nuqs";
import { Textarea } from "@/components/ui/textarea";

export function SnippetForm() {
  const router = useRouter();
  const [, setFormDirty] = useQueryState("dirty", { history: "replace" });

  const form = useForm<z.infer<typeof snippetSchema>>({
    defaultValues: { title: "", language: "javascript", visibility: "public" },
    resolver: zodResolver(snippetSchema),
  });

  const handleSubmitForm = async (values: z.infer<typeof snippetSchema>) => {
    const errors = await saveCodeSnippet(values);

    if (errors) {
      errors.forEach((error) => toast.error(error));
    } else {
      toast.success(`Code snippet ${values.title} posted`);
      router.back();
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col flex-1"
        onSubmit={form.handleSubmit(handleSubmitForm)}
        onChange={() => setFormDirty("true")}
        onReset={() => setFormDirty(null)}
      >
        <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_23rem]">
          <FormField
            control={form.control}
            name="language"
            render={({ field: { value: lang } }) => (
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <Editor
                    className="border-r"
                    loading={<div>Loading...</div>}
                    language={lang}
                    defaultLanguage="javascript"
                    defaultValue="// Write your code here"
                    onChange={field.onChange}
                    value={field.value}
                    // theme={theme === "light" ? "light" : "vs-dark"}
                  />
                )}
              />
            )}
          />

          <div className="flex flex-col gap-2 md:gap-4 p-4 border-t md:border-t-0">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter snippet title"
                      {...field}
                      value={field.value}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description..."
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="collection_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collection</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Save into collection" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {monacoLanguages.map((language) => (
                        <SelectItem key={language.id} value={language.id}>
                          {language.aliases?.at(0) ?? language.id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      inputProps={{ id: "_tags" }}
                      commandProps={{ label: "Select tags" }}
                      defaultOptions={[{ label: "aw", value: "aw" }]}
                      placeholder="Select tags"
                      value={field.value}
                      onChange={field.onChange}
                      hidePlaceholderWhenSelected
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {monacoLanguages.map((language) => (
                          <SelectItem key={language.id} value={language.id}>
                            {language.aliases?.at(0) ?? language.id}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visiblity</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
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

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : null}
            Post Code Snippet
          </Button>

          {/* <form.Subscribe selector={(state) => [state.isSubmitting]}>
            {([isSubmitting]) => (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin" /> : null}
                Save changes
              </Button>
            )}
          </form.Subscribe> */}
        </DialogFooter>
      </form>
    </Form>
  );
}
