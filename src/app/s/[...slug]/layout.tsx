import { AppHeader } from "@/components/global/app-header";
import { SnippetCopiesChart } from "@/components/global/charts/snippet-copies";
import { SnippetOptionsMenu } from "@/components/global/menus/snippet";
import { SnippetShareMenu } from "@/components/global/menus/snippet-share";
import { SnippetNav } from "@/components/global/navs/snippet";
import { SnippetCredButton } from "@/components/global/snippet-cred-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { StarIcon } from "lucide-react";
import { ReactNode } from "react";

type Props = { children: ReactNode; params: Promise<{ slug: string[] }> };

export default async function Layout({ children, params }: Props) {
  const { slug } = await params;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_20rem]  items-start">
      <div className="flex flex-col gap-4 container mx-auto max-w-screen-lg px-4 py-6 md:px-8">
        <AppHeader title={slug.at(-1)}>
          <SnippetOptionsMenu className="flex-none self-start" />
        </AppHeader>

        <SnippetNav slug={slug} comments={100} />

        {children}

        <form className="flex flex-col gap-2">
          <Textarea placeholder="Start typing..." />
          <Button type="submit" className="self-end">
            Add comment
          </Button>
        </form>
      </div>

      <div className="sticky top-14 py-6 pr-4 hidden xl:flex flex-col gap-4">
        <Card>
          <CardHeader className="">
            <div className="flex justify-between items-center">
              <h2 className="text-sm">Language</h2>

              <div className="flex items-center gap-1 font-bold">
                <StarIcon className="size-[0.8rem]" />
                <div className="text-sm">1231</div>
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="pt-3 space-y-2">
            <div className="text-xs text-center px-4 text-muted-foreground">
              Copies per week
            </div>
            <SnippetCopiesChart />
          </CardContent>

          <CardFooter className="border-t">
            <SnippetCredButton
              state="idle"
              votes={212}
              upvoteAction={async () => {
                "use server";
              }}
              downvoteAction={async () => {
                "use server";
              }}
            />

            <SnippetShareMenu
              url="a6d80e2f-6158-4919-912c-1dacf2e1f846"
              className="border"
            />
          </CardFooter>
        </Card>

        <Card className="p-4">ABOUT THE AUTHOR</Card>
      </div>
    </div>
  );
}
