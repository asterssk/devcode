"use client";

import {
  ArrowUpRight,
  CircleFadingPlus,
  FileInput,
  FolderPlus,
  Search,
  SearchIcon,
} from "lucide-react";
import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function SearchSnippetButton() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div>
      <button
        className={cn(
          "h-9 w-fit rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20",
          "hidden sm:inline-flex"
        )}
        type="button"
        onClick={() => setOpen(true)}
      >
        <span className="grow items-center flex">
          <Search
            className="-ms-1 me-3 text-muted-foreground/80"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          <span className="font-normal text-muted-foreground/70 pr-4 md:pr-0 line-clamp-1 text-left">
            Find snippets
          </span>
        </span>
        <kbd className="hidden -me-1 ms-12 md:inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
          ⌘K
        </kbd>
      </button>

      <Button
        size="icon"
        variant="outline"
        onClick={() => setOpen(true)}
        type="button"
        className="flex sm:hidden"
      >
        <SearchIcon />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick start">
            <CommandItem>
              <FolderPlus
                size={16}
                strokeWidth={2}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>New folder</span>
              <CommandShortcut className="justify-center">⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <FileInput
                size={16}
                strokeWidth={2}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Import document</span>
              <CommandShortcut className="justify-center">⌘I</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CircleFadingPlus
                size={16}
                strokeWidth={2}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Add block</span>
              <CommandShortcut className="justify-center">⌘B</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Navigation">
            <CommandItem>
              <ArrowUpRight
                size={16}
                strokeWidth={2}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Go to dashboard</span>
            </CommandItem>
            <CommandItem>
              <ArrowUpRight
                size={16}
                strokeWidth={2}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Go to apps</span>
            </CommandItem>
            <CommandItem>
              <ArrowUpRight
                size={16}
                strokeWidth={2}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Go to connections</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
