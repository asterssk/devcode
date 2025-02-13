import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CollectionForm } from "./_form";
import { collection } from "db/schema/collection";
import { eq } from "drizzle-orm";

type Props = { searchParams: Promise<{ id?: string }> };

async function getDefaultCollection(id?: string | null) {
  if (!id) return;
  return await db.query.collection.findFirst({ where: eq(collection.id, id) });
}

export default async function Page({ searchParams }: Props) {
  const { id } = await searchParams;
  const isNew = !id;
  const toEdit = await getDefaultCollection(id);

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader className="space-y-0 text-left">
          <DialogTitle className="border-b border-border px-4 py-3 text-base capitalize">
            {isNew ? "Create New" : "Update"} Collection
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="sr-only" />

        <div className="overflow-y-auto flex-1 bg-background flex flex-col">
          <CollectionForm defaulValue={toEdit} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
