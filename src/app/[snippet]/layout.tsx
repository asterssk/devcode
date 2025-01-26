import { AppHeader } from "@/components/app-header";
import { PostMenuButton } from "@/components/post-menu";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ReactNode } from "react";

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_23rem] items-start">
      <div className="flex flex-col gap-4 container mx-auto max-w-screen-lg px-4 py-6 md:px-8">
        <AppHeader title="Title">
          <PostMenuButton />
        </AppHeader>

        <div className="flex items-center justify-between gap-4">
          <span className="text-sm">Language</span>

          <span className="text-sm">Stars 400</span>
        </div>

        {children}

        <form className="flex flex-col gap-2">
          <Textarea placeholder="Start typing..." />
          <Button type="submit" className="self-end">
            Add comment
          </Button>
        </form>
      </div>

      <div className="sticky top-14 py-6 pr-4 hidden lg:flex flex-col gap-4">
        <Card className="p-4">ABOUT THE AUTHOR</Card>

        <div className="flex flex-col gap-2">
          <Button>Code</Button>
          <Button>Readme</Button>
          <Button>Statistics</Button>
          <Button>Comments / Reviews</Button>
        </div>
      </div>
    </div>
  );
}
