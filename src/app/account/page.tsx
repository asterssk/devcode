import { AppHeader } from "@/components/app-header";
import { Card } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_20rem] items-start">
      <div className="flex flex-col gap-4 container mx-auto max-w-screen-lg px-4 py-6 md:px-8">
        <AppHeader title="My Account"></AppHeader>
      </div>

      <div className="sticky top-14 py-6 pr-4 hidden lg:block">
        <Card>OVERVIEW</Card>
      </div>
    </div>
  );
}
