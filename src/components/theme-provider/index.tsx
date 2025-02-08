"use client";

import { ThemeProviderProps, useTheme } from "next-themes";
import dynamic from "next/dynamic";
import * as React from "react";
import { Button } from "../ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

const NextThemesProvider = dynamic(
  () => import("next-themes").then((e) => e.ThemeProvider),
  { ssr: false }
);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  //   const [theme, setTheme] = React.useState<string>("light");

  return (
    // <div key="__theme">
    //   <Toggle
    //     variant="outline"
    //     className="group size-9 data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted"
    //     pressed={theme === "dark"}
    //     onPressedChange={() =>
    //       setTheme((prev) => (prev === "dark" ? "light" : "dark"))
    //     }
    //     aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    //   >
    //     {/* Note: After dark mode implementation, rely on dark: prefix rather than group-data-[state=on]: */}
    //     <MoonIcon
    //       size={16}
    //       strokeWidth={2}
    //       className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
    //       aria-hidden="true"
    //     />
    //     <SunIcon
    //       size={16}
    //       strokeWidth={2}
    //       className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
    //       aria-hidden="true"
    //     />
    //   </Toggle>
    // </div>
    <Button
      variant="outline"
      size="icon"
      className="flex-none"
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
