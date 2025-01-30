"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

type Props = { className?: string };

export function MyCollectionsBreadcrumb({ className }: Props) {
  const { id: ids } = useParams<{ id?: string[] }>();

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {!ids ? (
          <BreadcrumbItem>
            <BreadcrumbPage>Collections</BreadcrumbPage>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem>
            <Link href="/collections" passHref legacyBehavior>
              <BreadcrumbLink href="/collections">Collections</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        )}

        {ids?.map((collectionId, index, og) => {
          const isLast = ids.at(-1) === collectionId;

          return (
            <React.Fragment key={collectionId}>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{collectionId}</BreadcrumbPage>
                ) : (
                  <Link
                    href={`/collections/` + og.slice(0, index + 1).join("/")}
                    passHref
                    legacyBehavior
                  >
                    <BreadcrumbLink>{collectionId}</BreadcrumbLink>
                  </Link>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// one;two
