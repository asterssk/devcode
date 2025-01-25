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
import { AppLogo } from "./app-logo";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

// This is sample data.
const data = {
  navMain: [
    {
      title: "TOPICS",
      items: [
        {
          title: "Popular",
          url: "/t/popular",
        },
        {
          title: "Frameworks",
          url: "/t/frameworks",
        },
      ],
    },
    {
      title: "LANGUAGES",
      items: [
        {
          title: "Routing",
          url: "#",
        },
        {
          title: "Data Fetching",
          url: "#",
        },
        {
          title: "Rendering",
          url: "#",
        },
        {
          title: "Caching",
          url: "#",
        },
        {
          title: "Styling",
          url: "#",
        },
        {
          title: "Optimizing",
          url: "#",
        },
        {
          title: "Configuring",
          url: "#",
        },
        {
          title: "Testing",
          url: "#",
        },
        {
          title: "Authentication",
          url: "#",
        },
        {
          title: "Deploying",
          url: "#",
        },
        {
          title: "Upgrading",
          url: "#",
        },
        {
          title: "Examples",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
              <Link href="/" passHref>
                <SidebarMenuButton isActive={segments.length < 1}>
                  <HomeIcon />
                  <span>Home</span>
                </SidebarMenuButton>
              </Link>

              <Link href="/following" passHref>
                <SidebarMenuButton isActive={segments.includes("following")}>
                  <UserCheck2Icon />
                  <span>Following</span>
                </SidebarMenuButton>
              </Link>

              <Link href="/community" passHref>
                <SidebarMenuButton isActive={segments.includes("community")}>
                  <UsersIcon />
                  <span>Community</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarSeparator />

            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarGroupLabel>{item.title}</SidebarGroupLabel>

                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => {
                      const isActive = segments.includes(
                        item.url.split("/").at(-1) ?? ""
                      );

                      return (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild isActive={isActive}>
                            <Link href={item.url}>{item.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
