"use client";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { CheckIcon, EditIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Label } from "./label";
import { Textarea } from "./textarea";

type Props = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> & {
  label?: string;
  placeholder?: string;
  value?: string | null;
  type?: "text" | "richtext";
};

export function EditableLabelForm({
  className,
  placeholder,
  value,
  label,
  type = "text",
  ...form
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <form
      {...form}
      className={cn(
        "grid border-b gap-1 transition-colors border-b-input pb-1",
        isEditing ? "border-b-primary" : "hover:border-b-primary",
        className
      )}
      onSubmit={() => setIsEditing(false)}
    >
      <Label
        htmlFor="__value"
        className="text-muted-foreground text-xs leading-none"
      >
        {label ?? "Value"}
      </Label>

      <div
        className={cn(
          "grid grid-cols-[1fr_min-content] gap-2 items-end text-ellipsis overflow-clip",
          type === "richtext" ? (value ? "h-auto" : "h-16") : "h-8"
        )}
        onClick={() => setIsEditing(true)}
      >
        {isEditing ? (
          type === "richtext" ? (
            <Textarea
              key="__richtext"
              id="__value"
              name="value"
              autoFocus
              rows={5}
              onBlur={() => setIsEditing(false)}
              placeholder={placeholder ?? "---"}
              defaultValue={value ?? ""}
              readOnly={!isEditing}
              className="h-full border-none shadow-none focus-visible:outline-hidden focus-visible:ring-0 rounded-none"
            ></Textarea>
          ) : (
            <Input
              key="__text"
              id="__value"
              name="value"
              autoFocus
              onBlur={() => setIsEditing(false)}
              placeholder={placeholder ?? "---"}
              defaultValue={value ?? ""}
              readOnly={!isEditing}
              className="h-full border-none shadow-none resize-none focus-visible:outline-hidden focus-visible:ring-0 rounded-none"
            />
          )
        ) : (
          <h4
            className={cn(
              "overflow-clip",
              !value && placeholder ? "text-muted-foreground text-xs" : ""
            )}
          >
            {value ?? placeholder ?? "---"}
          </h4>
        )}

        {isEditing ? (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              type="submit"
              disabled={!isEditing}
            >
              <CheckIcon />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              type="reset"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(false);
              }}
              disabled={!isEditing}
            >
              <XIcon />
            </Button>
          </div>
        ) : (
          <EditIcon className="size-3.5" />
        )}
      </div>
    </form>
  );
}
