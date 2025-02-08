"use client";

import { CardContent } from "@/components/ui/card";
import { useSnippetPost } from "../provider";
import Link from "next/link";
import { CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCopyCodeToClipboard } from "@/hooks/use-copy-code-to-clipboard";

export function PostSnippetCardContent() {
  const { snippet, urls } = useSnippetPost();
  const copyCodeToClipboard = useCopyCodeToClipboard();

  return (
    <CardContent className={cn("relative border-b p-0 h-64")}>
      <Link
        href={urls.post}
        className="absolute bg-gray-200 dark:bg-gray-950 inset-0"
      >
        Card Content
      </Link>

      <div className="px-2 py-2 mt-auto absolute bottom-0 flex flex-wrap gap-2 opacity-85">
        <Badge size="xs" variant="tag">
          Javascript
        </Badge>
        <Badge size="xs" variant="tag">
          Typescript
        </Badge>
        <Badge size="xs" variant="tag">
          React
        </Badge>
      </div>

      <Button
        size="icon-xs"
        variant="secondary"
        className="absolute top-3 right-3"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (snippet?.content) copyCodeToClipboard(snippet.content);
        }}
      >
        <CopyIcon />
      </Button>
    </CardContent>
  );
}
