"use client";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { CheckCircle2Icon, EditIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Label } from "./label";

type Props = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> & { label?: string; placeholder?: string; value?: string | null };

export function EditableLabelForm({
  className,
  placeholder,
  value,
  label,
  ...form
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <form
      {...form}
      className={cn(
        "grid gap-0.5 border-b transition-colors border-b-input",
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
        className="grid grid-cols-[1fr_min-content] items-center h-9"
        onClick={() => setIsEditing(true)}
      >
        {isEditing ? (
          <Input
            id="__value"
            name="value"
            autoFocus
            onBlur={() => setIsEditing(false)}
            placeholder={placeholder ?? "---"}
            defaultValue={value ?? ""}
            readOnly={!isEditing}
            className="h-auto border-none shadow-none resize-none focus-visible:outline-none focus-visible:ring-0 rounded-none"
          />
        ) : (
          <h4
            className={
              !value && placeholder ? "text-muted-foreground text-xs" : ""
            }
          >
            {value ?? placeholder ?? "---"}
          </h4>
        )}

        {isEditing ? (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              type="submit"
              disabled={!isEditing}
            >
              <CheckCircle2Icon />
              Confirm
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
