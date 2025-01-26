import { AppHeader } from "@/components/app-header";
import { PostSnippet } from "@/components/post-snippet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SortAscIcon } from "lucide-react";

type Props = { params: Promise<{ id: string }> };

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <div className="flex flex-col gap-5 container mx-auto max-w-screen-lg px-4 py-6 md:px-8">
      <AppHeader title={id}>
        <div className="flex gap-2">
          <Input className="w-60" placeholder="Search in this collection" />
          <Button size="icon" variant="outline">
            <SortAscIcon />
          </Button>
        </div>
      </AppHeader>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum modi
        iusto ea sunt assumenda mollitia ex excepturi unde numquam, est, ipsam
        maiores officiis sequi consequuntur. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Unde optio illo officia vel qui vero
        aliquid commodi, quaerat labore. Sunt, id repellendus, rem
        necessitatibus quibusdam quod dolor molestiae similique quis officia
        delectus error explicabo commodi fuga. At esse numquam alias cumque
        voluptatem, architecto quaerat soluta reprehenderit aperiam porro
        aliquid omnis ullam, repellendus commodi necessitatibus animi!
      </p>

      <PostSnippet savedDate={new Date().toDateString()} />
      <PostSnippet savedDate={new Date().toDateString()} />
      <PostSnippet savedDate={new Date().toDateString()} />
      <PostSnippet savedDate={new Date().toDateString()} />
      <PostSnippet savedDate={new Date().toDateString()} />
      <PostSnippet savedDate={new Date().toDateString()} />
      <PostSnippet savedDate={new Date().toDateString()} />
      <PostSnippet savedDate={new Date().toDateString()} />
      <PostSnippet savedDate={new Date().toDateString()} />
      <PostSnippet savedDate={new Date().toDateString()} />
      <PostSnippet savedDate={new Date().toDateString()} />
      <PostSnippet savedDate={new Date().toDateString()} />
      <PostSnippet savedDate={new Date().toDateString()} />
      <PostSnippet savedDate={new Date().toDateString()} />
      <PostSnippet savedDate={new Date().toDateString()} />
      <PostSnippet savedDate={new Date().toDateString()} />
    </div>
  );
}
