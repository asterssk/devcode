"use client";

import { CheckIcon, CopyIcon, CornerUpRightIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { Popover, PopoverContent } from "../../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Input } from "../../ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  url: string;
  className?: string;
  variant?: "secondary" | "ghost";
};

export function SnippetShareMenu({ url, variant, className }: Props) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="xs" variant={variant ?? "ghost"} className={className}>
          <CornerUpRightIcon />
          Share
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80" side="left" align="end">
        <div className="grid gap-4">
          <h4 className="font-medium leading-none">Share</h4>

          <div className="relative">
            <Input defaultValue={url} readOnly className="pe-9" />

            <button
              onClick={handleCopy}
              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed"
              aria-label={copied ? "Copied" : "Copy to clipboard"}
              disabled={copied}
            >
              <div
                className={cn(
                  "transition-all",
                  copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
                )}
              >
                <CheckIcon
                  className="stroke-emerald-500"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>
              <div
                className={cn(
                  "absolute transition-all",
                  copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                )}
              >
                <CopyIcon size={16} strokeWidth={2} aria-hidden="true" />
              </div>
            </button>
          </div>

          <div className="flex gap-3 flex-wrap items-center">
            <Button size="xs" variant="secondary">
              <Image
                src="/twitter-x.svg"
                height={17}
                width={17}
                quality={50}
                alt="Share to x"
                className="dark:invert"
              />
              Share to X
            </Button>

            <Button size="xs" variant="secondary">
              <Image
                src="/facebook.svg"
                height={17}
                width={17}
                quality={50}
                alt="Share to facebook"
                className="dark:invert"
              />
              Share to Facebook
            </Button>

            <Button size="xs" variant="secondary">
              <Image
                src="/dev-to.svg"
                height={16}
                width={16}
                quality={50}
                alt="Share to dev-to"
                className="dark:invert"
              />
              Share to DEV
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
