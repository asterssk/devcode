"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { collectionSchema } from "@/lib/schema/collections";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ColorPicker } from "@/components/ui/color-picker";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Props = { parent_id?: string };

export function CollectionForm({}: Props) {
  const form = useForm<z.infer<typeof collectionSchema>>({
    resolver: zodResolver(collectionSchema),
    defaultValues: { visibility: "public" },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-6 px-4 py-4 flex-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter collection name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-start justify-between">
            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visibility</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      className="flex gap-0 -space-x-px rounded-lg shadow-sm shadow-black/5 rtl:space-x-reverse"
                      type="single"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <ToggleGroupItem
                        className="flex-1 rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
                        value="public"
                      >
                        Public
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        className="flex-1 rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
                        value="private"
                      >
                        Private
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <ColorPicker value={value ?? ""} onChange={onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <DialogFooter className="border-t border-border px-4 py-3 sticky bottom-0 bg-background">
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
