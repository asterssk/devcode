import { Button } from "@/components/ui/button";
import { FilterIcon, SlidersHorizontalIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Followers" };

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-4">
        <Button variant="secondary">
          <FilterIcon />
          Filter
        </Button>
        <Button variant="secondary">
          <SlidersHorizontalIcon />
          Manage Posts
        </Button>
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
