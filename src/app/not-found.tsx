"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <Empty className="flex-1 flex flex-col gap-6">
      <Image
        src="/icons/not-found.png"
        height={300}
        width={300}
        alt="not-found"
        quality={50}
        priority
      />

      <Button variant="link" onClick={router.back}>
        <ArrowLeftIcon />
        Go back
      </Button>
    </Empty>
  );
}
