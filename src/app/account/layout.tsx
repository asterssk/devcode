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
  const user = session?.user!;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_20rem] items-start">
      <div className="flex flex-col gap-4 container mx-auto max-w-(--breakpoint-lg) px-4 py-6 md:px-8">
        <AppHeader
          title={
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage
                  src={user.image ?? ""}
                  alt={user.username ?? user.name}
                />
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <h1 className="flex-1 text-md">{user.name}</h1>
                <h5 className="text-xs text-muted-foreground">
                  @{user.username}
                </h5>
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
