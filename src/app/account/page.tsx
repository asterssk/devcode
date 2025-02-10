import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Activity" };

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <h2>Tags</h2>
      </div>

      <div className="flex flex-col gap-2">
        <h2>Credibility</h2>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h2>Posts</h2>

          <Link href="/posts" passHref>
            <Button variant="transparent" size="xs" className="group">
              Manage
              <ChevronRight className="transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h2>Followed Posts</h2>

          <Link href="/posts" passHref>
            <Button variant="transparent" size="xs" className="group">
              More
              <ChevronRight className="transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h2>Upvotes</h2>

          <Link href="/posts" passHref>
            <Button variant="transparent" size="xs" className="group">
              More
              <ChevronRight className="transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h2>Downvotes</h2>

          <Link href="/posts" passHref>
            <Button variant="transparent" size="xs" className="group">
              More
              <ChevronRight className="transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
