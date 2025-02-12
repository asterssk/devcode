import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { kAppDescription, kAppName, kAppTagline } from "@/constants";
import "./globals.css";
import { UserAvatar } from "@/components/global/user-avatar";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import Link from "next/link";
import { AppSidebar } from "@/components/global/navs/app-sidebar";
import { ReactNode } from "react";
import { ThemeProvider, ThemeToggler } from "@/components/theme-provider";
import { RainbowButton } from "@/components/global/rainbow-button";
import SearchSnippetButton from "@/components/global/search-snippet-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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
    template: `%s - ${kAppName}`,
    default: `${kAppName} - ${kAppTagline}`,
  },
  description: kAppDescription,
};

type Props = { children: ReactNode; dialog: ReactNode };

export default async function RootLayout({ children, dialog }: Props) {
  const session = await auth.api.getSession({ headers: await headers() });

  const sampleLanguages = [
    { label: "Javascript", id: "js" },
    { label: "CSS", id: "css" },
  ];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NuqsAdapter>
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
                        <Button size="icon" asChild variant="outline">
                          <Link href="/form/snippet">
                            <PlusIcon />
                          </Link>
                        </Button>
                      </TooltipTrigger>

                      <TooltipContent>
                        <p>Post a snippet</p>
                      </TooltipContent>
                    </Tooltip>

                    <ThemeToggler />

                    {session ? (
                      <UserAvatar
                        user={{
                          name: session.user.name,
                          email: session.user.email,
                          avatar: session.user.image,
                        }}
                      />
                    ) : (
                      <Link href="/form/auth" passHref>
                        <RainbowButton>Signin</RainbowButton>
                      </Link>
                    )}
                  </div>
                </header>

                <main className="flex-1 flex flex-col">{children}</main>

                {dialog}
              </SidebarInset>
            </SidebarProvider>

            <Toaster />
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
