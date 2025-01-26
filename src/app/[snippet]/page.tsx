import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { CopyIcon, MessageCircleCodeIcon } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum modi
        iusto ea sunt assumenda mollitia ex excepturi unde numquam, est, ipsam
        maiores officiis sequi consequuntur. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Unde optio illo officia vel qui vero
        aliquid commodi, quaerat labore. Sunt, id repellendus, rem
        necessitatibus quibusdam quod
      </p>

      <Card className="h-[50rem] relative flex flex-col">
        <CardHeader className="bg-gray-200 dark:bg-gray-900 py-2 pr-2 border-b">
          <div className="flex items-center justify-between">
            <span className="text-sm">Implementation</span>

            <div className="flex gap-2 sticky top-14">
              <Button size="icon-xs" variant="secondary">
                <CopyIcon />
              </Button>

              <Button size="icon-xs" variant="secondary">
                <MessageCircleCodeIcon />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="h-[20rem] relative flex flex-col">
        <CardHeader className="bg-gray-200 dark:bg-gray-900 py-2 pr-2 border-b">
          <div className="flex items-center justify-between">
            <span className="text-sm">Usage</span>

            <div className="flex gap-2 sticky top-14">
              <Button size="icon-xs" variant="secondary">
                <CopyIcon />
              </Button>

              <Button size="icon-xs" variant="secondary">
                <MessageCircleCodeIcon />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
