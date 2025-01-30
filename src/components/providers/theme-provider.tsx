"use client";

import { ThemeProviderProps, useTheme } from "next-themes";
import dynamic from "next/dynamic";
import * as React from "react";
import { Button } from "../ui/button";
import { MoonStarIcon, SunIcon } from "lucide-react";

const NextThemesProvider = dynamic(
  () => import("next-themes").then((e) => e.ThemeProvider),
  { ssr: false }
);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="flex-none"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <MoonStarIcon /> : <SunIcon />}
    </Button>
  );
}
