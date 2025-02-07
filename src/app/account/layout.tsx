import { AppHeader } from "@/components/app-header";
import { AccountNav } from "@/components/navs/account";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { kAppName } from "@/constants";
import { Metadata } from "next";
import { ReactNode } from "react";

type Props = { children: ReactNode };

export async function generateMetadata(): Promise<Metadata> {
  // Fetch username
  const sample = "Sample";

  return {
    title: {
      template: `%s - ${sample} - ${kAppName}`,
      default: `${sample} - ${kAppName}`,
    },
  };
}

export default function Layout({ children }: Props) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_20rem] items-start">
      <div className="flex flex-col gap-4 container mx-auto max-w-screen-lg px-4 py-6 md:px-8">
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

        <AccountNav id={""} />

        {children}
      </div>

      <div className="sticky top-14 py-6 pr-4 hidden lg:block">
        <Card>OVERVIEW e.g. Karma points</Card>
        <Card>FOLLOWERS</Card>
      </div>
    </div>
  );
}
