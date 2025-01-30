"use client";

import { Button } from "@/components/ui/button";
import { myCollectionsViewAtom } from "@/lib/atoms/collections";
import { useAtom } from "jotai";
import { Grid2x2Icon, PlusIcon, SortAscIcon, Table2Icon } from "lucide-react";
import Link from "next/link";

export function MyCollectionsToolbar() {
  const [_view, setView] = useAtom(myCollectionsViewAtom);

  return (
    <div className="flex gap-2 items-center">
      <Link href="/form/collection">
        <Button size="sm" className="hidden md:inline-flex">
          <PlusIcon />
          Create new collection
        </Button>

        <Button size="icon" className="inline-flex md:hidden">
          <PlusIcon />
        </Button>
      </Link>

      <Button size="icon" variant="outline">
        <SortAscIcon />
      </Button>

      <Button
        size="icon"
        variant="outline"
        onClick={() => setView((c) => (c === "grid" ? "table" : "grid"))}
      >
        {_view === "grid" ? <Table2Icon /> : <Grid2x2Icon />}
      </Button>
    </div>
  );
}
