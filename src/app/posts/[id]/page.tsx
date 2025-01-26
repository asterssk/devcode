import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Post Snippet" };

export default function Page() {
  return (
    <div className="flex flex-col gap-8 container mx-auto max-w-screen-lg px-4 py-6 md:px-8">
      <AppHeader title="Create new snippet"></AppHeader>

      <div className="flex-1">
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>asdasd</p>
        <p>END</p>
      </div>

      <div className="flex items-center justify-between gap-6">
        <Button variant="secondary">Reset</Button>

        <div className="flex items-center gap-6">
          <Button variant="secondary">Save as draft</Button>

          <Button>PUBLISH</Button>
        </div>
      </div>
    </div>
  );
}
