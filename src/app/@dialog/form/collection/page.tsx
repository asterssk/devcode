import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CollectionForm } from "./_form";
import { eq } from "drizzle-orm";
import { collection } from "db/schema/collection";

type Props = { searchParams: Promise<{ id?: string; parent?: string }> };

async function getParentId(parent?: string) {
  if (!parent) return;
  const [username, slug] = parent.split(";");
  if (!username || !slug) return;

  const result = await db.query.collection.findFirst({
    columns: { id: true },
    where: eq(collection.slug, slug),
  });
  return result?.id;
}

async function getDefaultCollection(id?: string | null) {
  if (!id) return;
  return await db.query.collection.findFirst({ where: eq(collection.id, id) });
}

export default async function Page({ searchParams }: Props) {
  const { id, parent } = await searchParams;
  const isNew = !id;

  const parentId = await getParentId(parent);
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
          <CollectionForm parentId={parentId} defaulValue={toEdit} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
