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
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = { parent_id?: string };

export function CollectionForm({}: Props) {
  const router = useRouter();

  const form = useForm<Partial<z.infer<typeof collectionSchema>>>({
    defaultValues: { visibility: "public" },
    validators: { onBlur: collectionSchema },
    onSubmit: async ({ value }) => {
      const errors = await saveCollectionSnippet(value);

      if (!errors) {
        toast.success(`Collection ${value.name} created`, {
          position: "top-right",
        });
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
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-6 px-4 py-4 flex-1">
        <form.Field name="name">
          {(field) => (
            <div className="grid gap-2">
              <Label htmlFor="_name">Name</Label>
              <Input
                id="_name"
                name={field.name}
                defaultValue={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter collection name"
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

          <form.Field name="color">
            {(field) => (
              <div className="grid gap-2">
                <Label htmlFor="_color">Color</Label>
                <ColorPicker
                  value={field.state.value}
                  onChange={field.handleChange}
                />

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

      <DialogFooter className="border-t border-border px-4 py-3 sticky bottom-0 bg-background">
        <Button
          type="reset"
          variant="secondary"
          className="mr-4"
          onClick={() => form.reset()}
        >
          Reset
        </Button>

        <form.Subscribe
          selector={(state) => [state.isSubmitting]}
          children={([isSubmitting]) => (
            // <Button type="submit" disabled={!canSubmit || isSubmitting}>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="animate-spin" /> : null}
              Save changes
            </Button>
          )}
        />
      </DialogFooter>
    </form>
  );
}
