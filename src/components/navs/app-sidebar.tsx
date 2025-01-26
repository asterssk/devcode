"use client";

import * as React from "react";
import { HomeIcon, UserCheck2Icon, UsersIcon } from "lucide-react";
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
    { label: "Community", icon: UsersIcon, url: "/community" },
  ],
  navTopics: [
    { label: "Best Practices", icon: HomeIcon, url: "/best-practices" },
    { label: "Frameworks", icon: UserCheck2Icon, url: "/frameworks" },
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
                  <Link key={item.url} href={item.url} passHref>
                    <SidebarMenuButton isActive={isActive}>
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                );
              })}
            </SidebarMenuItem>

            <SidebarSeparator />

            <SidebarMenuItem>
              <SidebarGroupLabel>TOPICS</SidebarGroupLabel>

              <SidebarMenuSub>
                {data.navTopics.map((item) => {
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
