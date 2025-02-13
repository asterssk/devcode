import { ReactNode } from "react";
import { MyCollectionsToolbar } from "./_toolbar";
import { MyCollectionsBreadcrumb } from "./_breadcrumb";
import { AppHeader } from "@/components/global/app-header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type Props = { children: ReactNode };

export default async function Layout({ children }: Props) {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
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

      <div className="flex-1 relative">
        <div className="absolute inset-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
