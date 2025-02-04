import { Button } from "@/components/ui/button";
import { FilterIcon, SlidersHorizontalIcon, SortDescIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-4">
        <Button variant="secondary" size="xs">
          <FilterIcon />
          Filter
        </Button>

        <Button variant="secondary" size="xs">
          <SortDescIcon />
          Sort
        </Button>

        <div className="ml-auto" />

        <Link href="/posts" passHref>
          <Button variant="secondary" size="xs">
            <SlidersHorizontalIcon />
            Manage Posts
          </Button>
        </Link>
      </div>

      <p>START</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>content</p>
      <p>END</p>
    </div>
  );
}
