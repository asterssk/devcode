"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { collectionSchema } from "@/lib/schema/collections";
import { z } from "zod";
import { ColorPicker } from "@/components/ui/color-picker";
import { Loader2 } from "lucide-react";
import { saveCollectionSnippet } from "./_actions";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useQueryState } from "nuqs";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

type Props = {
  parent_id?: string;
  defaulValue?: z.infer<typeof collectionSchema>;
};

export function CollectionForm({ defaulValue }: Props) {
  const router = useRouter();
  const [, setFormDirty] = useQueryState("dirty", { history: "replace" });

  const form = useForm<z.infer<typeof collectionSchema>>({
    defaultValues: defaulValue ?? { name: "", color: "", visibility: "public" },
    resolver: zodResolver(collectionSchema),
  });

  const handleSubmitForm = async (values: z.infer<typeof collectionSchema>) => {
    const errors = await saveCollectionSnippet(values);
    if (errors) {
      errors.forEach((error) => toast.error(error));
    } else {
      toast.success(`Collection ${values.name} created`);
      router.back();
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(handleSubmitForm)}
        onChange={() => setFormDirty("true")}
        onReset={() => setFormDirty(null)}
      >
        <div className="flex flex-col gap-6 px-4 py-4 flex-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter collection name"
                    {...field}
                    value={field.value}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid md:grid-cols-2 gap-4">
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

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <ColorPicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <DialogFooter className="px-4 py-3 sticky bottom-0 bg-background">
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
            Create Collection
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
