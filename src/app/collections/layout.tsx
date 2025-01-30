import { AppHeader } from "@/components/app-header";
import { ReactNode } from "react";
import { MyCollectionsToolbar } from "./_toolbar";
import { MyCollectionsBreadcrumb } from "./_breadcrumb";

type Props = { children: ReactNode };
export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col flex-1 gap-4">
      <AppHeader
        title={<MyCollectionsBreadcrumb className="hidden md:inline-flex" />}
        className="pt-4 px-6 container mx-auto "
      >
        <MyCollectionsToolbar />
      </AppHeader>

      <MyCollectionsBreadcrumb className="px-4 md:px-0 inline-flex md:hidden" />

      <div className="flex-1 relative">
        <div className="absolute inset-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
