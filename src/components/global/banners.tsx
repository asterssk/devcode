"use client";

import { useState } from "react";
import { Alert, AlertDescription } from "../ui/alert";
import Link from "next/link";
import { Button } from "../ui/button";

type DataMap = { msg: string; action: { href: string; label: string } };
type KeyMap = "anonymous";

type Props = { anonymous: boolean };

export function RootBanners({ anonymous }: Props) {
  const [banners, setBanners] = useState(() => {
    const map = new Map<KeyMap, DataMap>([
      [
        "anonymous",
        {
          msg: `To prevent data loss, create an account. Anonymous data are not recoverable.`,
          action: { href: `/account/settings`, label: "Connect account" },
        },
      ],
    ]);

    if (!anonymous) map.delete("anonymous");

    return map;
  });

  if (banners.size < 1) return null;

  return (
    <>
      {banners
        .entries()
        .toArray()
        .map(([key, data]) => {
          return (
            <Alert
              key={key}
              className="border-none rounded-none bg-destructive/50 flex items-center justify-between gap-2"
            >
              <AlertDescription className="text-sm">
                {data.msg}
              </AlertDescription>

              <Link href={data.action.href} className="ml-auto">
                <Button size="xs" variant="secondary">
                  {data.action.label}
                </Button>
              </Link>

              <Button
                size="xs"
                variant="transparent"
                onClick={() =>
                  setBanners((map) => {
                    map.delete(key);
                    return new Map(map);
                  })
                }
              >
                Dismiss
              </Button>
            </Alert>
          );
        })}
    </>
  );
}
