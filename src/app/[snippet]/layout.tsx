import { AppHeader } from "@/components/app-header";
import { SnippetCopiesChart } from "@/components/charts/snippet-copies";
import { SnippetMenuButton } from "@/components/menus/snippet";
import { SnippetNav } from "@/components/navs/snippet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { StarIcon } from "lucide-react";
import { ReactNode } from "react";

type Props = { children: ReactNode; params: Promise<{ snippet: string }> };

export default async function Layout({ children, params }: Props) {
  const { snippet } = await params;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_20rem]  items-start">
      <div className="flex flex-col gap-4 container mx-auto max-w-screen-lg px-4 py-6 md:px-8">
        <AppHeader title={snippet}>
          <SnippetMenuButton className="ml-auto flex-none self-start" />
        </AppHeader>

        <SnippetNav id={snippet} comments={100} />

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
        </Card>

        <Card className="p-4">ABOUT THE AUTHOR</Card>
      </div>
    </div>
  );
}
