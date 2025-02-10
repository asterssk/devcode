"use client";

import { cn } from "@/lib/utils";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { SendHorizontalIcon, SmileIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "./input";
import React from "react";

type Props = {
  shrinkable?: boolean;
  value?: string;
  placeholder?: string;
  className?: string;
  labels?: { submit?: string; cancel?: string };
  onCancel?: () => void;
  onSubmit?: (value: string) => void;
};

export function CommentField({
  shrinkable,
  className,
  value,
  placeholder,
  labels,
  onCancel,
  onSubmit,
}: Props) {
  const [shrinked, setShrinked] = useState(shrinkable ?? false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCancel = () => {
    onCancel?.();
    if (textAreaRef.current) textAreaRef.current.value = "";
    if (shrinkable) setShrinked(true);
  };

  const handleSubmit = () => {
    const content = textAreaRef.current?.value;
    if (!content) {
      textAreaRef.current?.focus();
      return;
    }

    onSubmit?.(content);
    handleCancel();
  };

  if (shrinkable && shrinked) {
    return (
      <div
        className={cn(
          "flex items-center border border-input rounded-md p-1",
          className
        )}
        onClick={() => setShrinked(false)}
      >
        <Button
          size="icon"
          className="flex-none"
          type="button"
          variant="transparent"
        >
          <SmileIcon />
        </Button>

        <Input
          ref={inputRef}
          placeholder={placeholder}
          readOnly
          className="h-[2.25rem] border-none shadow-none resize-none focus-visible:outline-none focus-visible:ring-0 rounded-none"
        />

        <Button size="icon-xs" className="flex-none mr-0.5" type="button">
          <SendHorizontalIcon />
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-0 border border-input rounded-md overflow-clip",
        "focus-within:border-primary",
        className
      )}
    >
      <Textarea
        ref={textAreaRef}
        placeholder={placeholder}
        autoFocus
        rows={1}
        className="border-none shadow-none resize-none focus-visible:outline-none focus-visible:ring-0 rounded-none"
        defaultValue={value}
      />

      <div className="flex gap-2 justify-between items-end px-1 pb-1">
        <Button size="icon-xs" className="h-7 w-7" variant="ghost">
          <SmileIcon />
        </Button>

        <div className="flex gap-3">
          <Button
            onClick={handleCancel}
            size="xs"
            variant="secondary"
            className="border"
            type="button"
          >
            {labels?.cancel ?? "Cancel"}
          </Button>

          <Button size="xs" onClick={handleSubmit} type="button">
            {labels?.submit ?? "Comment"}
          </Button>
        </div>
      </div>
    </div>
  );
}
