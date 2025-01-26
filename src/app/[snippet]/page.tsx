import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { CopyIcon, MessageCircleCodeIcon } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <Card className="h-[50rem] relative flex flex-col">
        <CardHeader className="bg-gray-200 py-2 pr-2 border-b sticky top-14">
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
        <CardHeader className="bg-gray-200 py-2 pr-2 border-b sticky top-14">
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

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ut
        numquam sint quas officia cum, consequatur alias exercitationem
        praesentium quasi accusamus sit ad illo aliquam enim accusantium quos
        maiores facilis. Adipisci ex aliquid error aperiam, accusamus culpa iste
        nobis doloribus voluptatibus tempore illo fugiat eum consequatur ea aut
        rem esse sed non totam exercitationem necessitatibus? Commodi libero cum
        officia doloremque quaerat odit esse facere quasi eveniet tenetur aut
        fugit nisi, labore, iure animi ex. Eum sed neque optio accusantium
        veritatis impedit illo dolore reprehenderit numquam, eaque voluptatibus
        dolorem, sapiente nam molestias ratione corporis non at perferendis.
        Quaerat optio sint debitis consequuntur recusandae accusantium itaque
        mollitia.
      </p>
    </div>
  );
}
