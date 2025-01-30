import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
import { ReactNode } from "react";
import {
  ThemeProvider,
  ThemeToggler,
} from "@/components/providers/theme-provider";

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

type Props = { children: ReactNode; dialog: ReactNode };

export default function RootLayout({ children, dialog }: Props) {
  const sampleLanguages = [
    { label: "Javascript", id: "js" },
    { label: "CSS", id: "css" },
  ];

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
            <AppSidebar languages={sampleLanguages} />

            <SidebarInset>
              <header className="z-10 flex sticky top-0 bg-background h-14 shrink-0 items-center gap-2 border-b px-4 justify-between">
                <div className="flex gap-1 sm:gap-2 md:gap-3 items-center">
                  <SidebarTrigger className="inline-flex md:hidden" />
                  <SearchSnippetButton />
                </div>

                <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                  <Tooltip delayDuration={500}>
                    <TooltipTrigger asChild>
                      <Link href="/form/snippet" passHref>
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

              {dialog}
            </SidebarInset>
          </SidebarProvider>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
