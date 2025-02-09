"use client";

import { TabsContent } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import { useSearchParams } from "next/navigation";
import { SnippetCodeSection } from "./code";
import { SnippetCommentsSection } from "./comments";

export function SnippetTabs() {
  const searchParams = useSearchParams();
  const t = searchParams.get("t") ?? "code";

  return (
    <Tabs defaultValue="code" value={t} className="px-2 sm:px-4 md:px-8 flex-1">
      <TabsContent value="code">
        <SnippetCodeSection />
      </TabsContent>
      <TabsContent value="comments">
        <SnippetCommentsSection />
      </TabsContent>
    </Tabs>
  );
}
