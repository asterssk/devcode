import { AppHeader } from "@/components/global/app-header";
import { SnippetOptionsMenu } from "@/components/global/menus/snippet";
import { SnippetShareMenu } from "@/components/global/menus/snippet-share";
import { SnippetNav } from "@/components/global/navs/snippet";
import { SnippetCredButton } from "@/components/global/snippet-cred-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BookmarkIcon, MessageCircleIcon, User2Icon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

type Props = { children: ReactNode; params: Promise<{ slug: string[] }> };

export default async function Layout({ children, params }: Props) {
  const { slug } = await params;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_20rem] items-start">
      <div className="flex flex-col gap-4 container mx-auto max-w-screen-lg py-6 sm:px-4 md:px-8">
        <AppHeader title={slug.at(-1)}>
          <SnippetOptionsMenu className="flex-none self-start" />
        </AppHeader>

        <SnippetNav slug={slug} comments={100} />

        {/* <form className="flex items-start gap-2">
          <Textarea placeholder="Start typing..." />
          <Button type="submit" className="self-end">
            Add comment
          </Button>
        </form> */}

        {children}
      </div>

      <div className="sticky top-14 py-6 pr-4 hidden xl:flex flex-col gap-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between gap-4">
              <Link
                href={`/u/username`}
                className="flex gap-3 flex-1 items-center"
              >
                <Avatar className="size-8">
                  <AvatarImage alt="user-avatar" />
                  <AvatarFallback>
                    <User2Icon className="size-5 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>

                <span className="text-sm">Sample Name</span>
              </Link>

              <Button size="xs" variant="secondary" className="border">
                Follow
              </Button>
            </div>
          </CardHeader>

          <CardDescription>
            <p className="line-clamp-3 px-4 text-xs">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde
              nesciunt corrupti nobis officiis exercitationem error at similique
              aperiam doloribus. Ducimus similique minus esse eos!
            </p>
          </CardDescription>

          <CardContent className="px-4 py-2">
            <p className="text-sm">Credibility points: 9999</p>
            <p className="text-sm">Shared codes: 9999</p>
            <p className="text-sm">Comments posted: 9999</p>
          </CardContent>
        </Card>

        <Card>
          {/* <CardHeader className="flex ">
            <h2>Language</h2>
          </CardHeader>

          <CardContent className="pt-3 space-y-2">
            <SnippetCopiesChart />
          </CardContent> */}

          <CardFooter className="grid gap-4">
            {/* <div className="flex justify-between w-full items-center"> */}
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

            <div className="grid grid-cols-2 gap-3">
              <Button
                size="xs"
                variant="secondary"
                className="border w-full"
                asChild
              >
                <Link href={`/form/comment?id=asdsr3241223&intent=write`}>
                  <MessageCircleIcon />
                  Comment
                </Link>
              </Button>

              <SnippetShareMenu
                url={""}
                variant="secondary"
                className="border"
              />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
