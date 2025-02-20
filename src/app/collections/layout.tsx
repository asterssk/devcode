import { ReactNode } from "react";
import { AppHeader } from "@/components/global/app-header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { CollectionContentWrapper } from "./_components/content_wrapper";
import { MyCollectionsToolbar } from "./_components/toolbar";
import { MyCollectionsBreadcrumb } from "./_components/breadcrumb";

type Props = { children: ReactNode };

export default async function Layout({ children }: Props) {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    // <CollectionContentWrapper>
    <div className="flex flex-col flex-1">
      {session ? null : (
        <Alert variant="warn">
          <AlertDescription>
            You can create a collection even without an account. We'll
            automatically set you up with an anonymous one.
          </AlertDescription>
        </Alert>
      )}

      <AppHeader
        title={<MyCollectionsBreadcrumb className="hidden md:inline-flex" />}
        className="py-5 container mx-auto px-4"
      >
        <MyCollectionsToolbar className="ml-auto" />
      </AppHeader>

      <CollectionContentWrapper>
        <div className="flex-1 w-full relative">
          <div className="absolute inset-0">{children}</div>
        </div>
      </CollectionContentWrapper>
    </div>
    // {/* </CollectionContentWrapper> */}
  );
}
