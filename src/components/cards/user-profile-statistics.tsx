"use client";

import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";

export function UserProfileStatistics() {
  return (
    <Card>
      <CardHeader className="">
        <div className="flex justify-between items-center">
          <div className="text-xs">Post Cred: 999</div>
          <div className="text-xs">Comment Cred: 999</div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-3 space-y-2">
        <div>Post Cred</div>
        <div>Comment Cred</div>
      </CardContent>
    </Card>
  );
}
