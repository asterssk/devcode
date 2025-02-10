import { AppHeader } from "@/components/global/app-header";
import { AccountNav } from "@/components/global/navs/account";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { kAppName } from "@/constants";
import { auth } from "@/lib/auth";
import { UserIcon } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import { ReactNode } from "react";

type Props = { children: ReactNode };

export async function generateMetadata(): Promise<Metadata> {
  const session = await auth.api.getSession({ headers: await headers() });
  const pageTitle = session?.user.name ?? "Account";

  return {
    title: {
      template: `%s - ${pageTitle} - ${kAppName}`,
      default: `${pageTitle} - ${kAppName}`,
    },
  };
}

export default async function Layout({ children }: Props) {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_20rem] items-start">
      <div className="flex flex-col gap-4 container mx-auto max-w-screen-lg px-4 py-6 md:px-8">
        <AppHeader
          title={
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage
                  src={session?.user.image ?? ""}
                  alt={session?.user.username}
                />
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <h1 className="flex-1 text-md">
                  {session?.user.name ?? "Account"}
                </h1>
                {session?.user.username ? (
                  <h5 className="text-xs text-muted-foreground">
                    @{session?.user.username}
                  </h5>
                ) : null}
              </div>
            </div>
          }
        ></AppHeader>

        <AccountNav />

        {children}
      </div>

      <div className="sticky top-14 py-6 pr-4 hidden lg:block">
        <Card>OVERVIEW e.g. Karma points</Card>
        <Card>FOLLOWERS</Card>
      </div>
    </div>
  );
}
