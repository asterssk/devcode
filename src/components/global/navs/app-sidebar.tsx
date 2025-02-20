"use client";

import * as React from "react";
import { HomeIcon, UserCheck2Icon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useSearchParams, useSelectedLayoutSegments } from "next/navigation";
import { AppLogo } from "../app-logo";

const data = {
  navBase: [
    { label: "Home", icon: HomeIcon, url: "/" },
    { label: "Following", icon: UserCheck2Icon, url: "/following" },
    // { label: "Community", icon: UsersIcon, url: "/community" },
  ],
  navCommunity: [
    { label: "Questions", icon: HomeIcon, url: "/questions" },
    { label: "Discussions", icon: UserCheck2Icon, url: "/discussions" },
  ],
} as const;

type Props = React.ComponentProps<typeof Sidebar> & {
  languages: { label: string; id: string }[];
};

export function AppSidebar({ languages, ...props }: Props) {
  const sp = useSearchParams();
  const segments = useSelectedLayoutSegments();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b h-14 flex justify-center">
        <AppLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="space-y-2">
            <SidebarMenuItem className="flex flex-col gap-1">
              {data.navBase.map((item, index) => {
                const isActive =
                  (index <= 0 && segments.length < 1) ||
                  segments.includes(item.url.split("/").at(-1) ?? "");

                return (
                  <SidebarMenuButton key={item.url} isActive={isActive} asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                );
              })}
            </SidebarMenuItem>

            <SidebarSeparator />

            <SidebarMenuItem>
              <SidebarGroupLabel>COMMUNITY</SidebarGroupLabel>

              <SidebarMenuSub>
                {data.navCommunity.map((item) => {
                  const isActive = segments.includes(
                    item.url.split("/").at(-1) ?? ""
                  );

                  return (
                    <SidebarMenuSubItem key={item.url}>
                      <SidebarMenuSubButton asChild isActive={isActive}>
                        <Link href={item.url}>{item.label}</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  );
                })}
              </SidebarMenuSub>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarGroupLabel>LANGUAGES</SidebarGroupLabel>

              <SidebarMenuSub>
                {languages.map((item) => {
                  const isActive = sp.get("lang")?.includes(item.id);

                  return (
                    <SidebarMenuSubItem key={item.id}>
                      <SidebarMenuSubButton asChild isActive={isActive}>
                        <Link href={`/?lang=${item.id}`}>{item.label}</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  );
                })}
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
