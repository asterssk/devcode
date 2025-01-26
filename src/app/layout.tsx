import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider, ThemeToggler } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { kAppDescription, kAppName, kAppTagline } from "@/constants";
import "./globals.css";
import SearchSnippetButton from "@/components/search-snippet-button";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import Link from "next/link";
import { AppSidebar } from "@/components/navs/app-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${kAppName}`,
    default: `${kAppName} - ${kAppTagline}`,
  },
  description: kAppDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar
              languages={[
                { label: "Javascript", id: "js" },
                { label: "CSS", id: "css" },
              ]}
            />

            <SidebarInset>
              <header className="z-10 flex sticky top-0 bg-background h-14 shrink-0 items-center gap-2 border-b px-4 justify-between">
                <SidebarTrigger className="inline-flex md:hidden" />

                <SearchSnippetButton />

                <div className="flex items-center gap-1 md:gap-2">
                  <Tooltip delayDuration={500}>
                    <TooltipTrigger asChild>
                      <Link href="/posts/create" passHref>
                        <Button size="icon" variant="outline">
                          <PlusIcon />
                        </Button>
                      </Link>
                    </TooltipTrigger>

                    <TooltipContent>
                      <p>Post a snippet</p>
                    </TooltipContent>
                  </Tooltip>

                  <ThemeToggler />

                  <UserAvatar
                    user={{
                      name: "Sample Name Too",
                      email: "sample@email.only",
                      avatar: "",
                    }}
                  />
                </div>
              </header>

              <main className="flex-1 flex flex-col">{children}</main>
            </SidebarInset>
          </SidebarProvider>
          {/* <header
            className={cn(
              "bg-background border-b sticky top-0 z-20 flex-none",
              "flex items-center justify-between px-4"
            )}
            style={{ height: kHeaderHeight }}
          >
            <div />

            <ThemeToggler />
          </header>

          <main className="flex-1 flex">
            <aside
              className="hidden md:block sticky w-0 md:w-56 xl:w-64 flex-none overflow-auto border-r"
              style={{
                top: kHeaderHeight,
                height: `calc(100vh - ${kHeaderHeight}px)`,
              }}
            ></aside>

            <div className="flex-1 flex flex-col">
              <div className="relative z-10 bg-background min-h-screen border-b shadow-bottom">
                {children}
              </div>

              <footer className="sticky bottom-0 h-40 bg-zinc-100 dark:bg-neutral-900">
                <div>footer</div>
              </footer>
            </div>
          </main> */}

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
