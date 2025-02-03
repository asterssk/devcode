import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { monacoLanguages } from "@/lib/data/monaco-languages";
import { snippetSchema } from "@/lib/schema/snippets";
import { useTheme } from "next-themes";
import { Control } from "react-hook-form";
import { z } from "zod";

type Props = { cn: Control<z.infer<typeof snippetSchema>> };

export function SnippetBasicFields({ cn }: Props) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-2 md:gap-4 p-4 border-t md:border-t-0">
      <FormField
        control={cn}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter snippet title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={cn}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tags</FormLabel>
            <FormControl>
              <Input placeholder="Select tags" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex items-start gap-4">
        <FormField
          control={cn}
          name="visibility"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Visibility</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Visibility type" />
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

        <FormField
          control={cn}
          name="language"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Language</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
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
      </div>
    </div>
  );
}
