import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { snippetSchema } from "@/lib/schema/snippets";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { Control } from "react-hook-form";
import { z } from "zod";

type Props = { cn: Control<z.infer<typeof snippetSchema>> };

export function SnippetEditor({ cn }: Props) {
  const { theme } = useTheme();

  return (
    <FormField
      control={cn}
      name="language"
      render={({ field: { value: lang } }) => (
        <FormField
          control={cn}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Editor
                  className="border-r"
                  loading={<div>Loading...</div>}
                  language={lang}
                  defaultLanguage="javascript"
                  defaultValue="// Write your code here"
                  onChange={field.onChange}
                  value={field.value}
                  theme={theme === "light" ? "light" : "vs-dark"}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}
    />
  );
}
