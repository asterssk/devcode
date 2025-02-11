import { UserProfileStatistics } from "@/components/cards/user-profile-statistics";
import { AppHeader } from "@/components/global/app-header";
import { UserProfileNav } from "@/components/global/navs/user-profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ReactNode } from "react";

type Props = { children: ReactNode; params: Promise<{ id: string }> };

export default async function Layout({ children, params }: Props) {
  const { id } = await params;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_20rem]  items-start">
      <div className="flex flex-col gap-4 container mx-auto max-w-(--breakpoint-lg) px-4 py-6 md:px-8">
        <AppHeader
          title={
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <h1 className="flex-1 text-md">This is a username</h1>
                <h5 className="text-xs text-muted-foreground">@username</h5>
              </div>
            </div>
          }
        ></AppHeader>

        <UserProfileNav id={id} />

        {children}

        <form className="flex flex-col gap-2">
          <Textarea placeholder="Start typing..." />
          <Button type="submit" className="self-end">
            Add comment
          </Button>
        </form>
      </div>

      <div className="sticky top-14 py-6 pr-4 hidden xl:flex flex-col gap-4">
        <Card className="p-4">
          <button>Follow</button>
          <button>Share</button>
          <button>Block</button>
          <button>Report</button>
        </Card>
        <UserProfileStatistics />
      </div>
    </div>
  );
}
