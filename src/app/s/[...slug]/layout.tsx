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
import { CommentField } from "@/components/ui/comment-field";
import { User2Icon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

type Props = { children: ReactNode; params: Promise<{ slug: string[] }> };

export default async function Layout({ children, params }: Props) {
  const { slug } = await params;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_19rem] items-start">
      <div className="h-full flex flex-col gap-4 container mx-auto max-w-(--breakpoint-lg) pt-6 ">
        <AppHeader title={slug.at(-1)} className="sm:px-4 md:px-8">
          <SnippetOptionsMenu className="flex-none self-start" />
        </AppHeader>

        <SnippetNav slug={slug} comments={100} />

        {children}
        {/* <div className="sm:px-4 md:px-8 flex-1">{children}</div> */}

        <CommentField
          shrinkable
          placeholder="Write a comment..."
          labels={{ submit: "Post Comment" }}
          className="sticky bottom-0 bg-background z-10 border-0 border-t rounded-none focus-within:border-input p-1"
        />
      </div>

      <div className="sticky top-14 p-3 hidden xl:flex flex-col gap-4 border-l h-rest">
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

        <div className="flex flex-col gap-2">
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

          <SnippetShareMenu url={""} variant="secondary" className="border" />
        </div>
      </div>
    </div>
  );
}
