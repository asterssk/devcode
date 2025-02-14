import { CollectionMenuButton } from "@/components/global/menus/collection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { TVisibility } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  EllipsisIcon,
  LibraryBigIcon,
  SquareDashedBottomCodeIcon,
} from "lucide-react";

type Props = {
  items: {
    id: string;
    name: string;
    isOwner: boolean;
    username: string;
    updatedAt: string;
    visibility: TVisibility;
  }[];
};

export function CollectionContentTableView({ items }: Props) {
  return (
    <Table
      className={cn(
        "border-separate border-spacing-0 [&_td]:border-border [&_tfoot_td]:border-t [&_th]:border-b [&_th]:border-border [&_tr_td]:border-b [&_tr]:border-none"
      )}
    >
      <TableHeader className="z-10 bg-background/90 backdrop-blur-xs text-xs">
        <TableRow className="hover:bg-transparent">
          <TableHead>NAME</TableHead>
          <TableHead>OWNER</TableHead>
          <TableHead>LAST MODIFIED</TableHead>
          <TableHead className="text-center w-24">VISIBILITY</TableHead>
          <TableHead className="text-right w-20" />
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.map((item) => (
          <TableRow
            key={item.id}
            // onClick={() => onCollectionClick?.(item.id)}
            className="cursor-pointer"
          >
            <TableCell>
              <div className="flex items-center gap-2">
                <LibraryBigIcon className="size-3.5" />
                {item.name}
              </div>
            </TableCell>
            <TableCell>{item.isOwner ? "Me" : item.username}</TableCell>
            <TableCell>{item.updatedAt}</TableCell>
            <TableCell className="text-center">
              <Badge
                size="xs"
                className="h-5 bg-teal-200 dark:bg-teal-900"
                variant="secondary"
              >
                {item.visibility.toUpperCase()}
              </Badge>
            </TableCell>

            <TableCell onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-end">
                <CollectionMenuButton id={item.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}

        {items.map((item) => (
          <TableRow
            key={item.id}
            // onClick={() => onSnippetClick?.(item.id)}
            className="cursor-pointer"
          >
            <TableCell>
              <div className="flex items-center gap-2">
                <SquareDashedBottomCodeIcon className="size-3.5" />
                {item.name}
              </div>
            </TableCell>
            <TableCell>Me, Us, Everyone</TableCell>
            <TableCell>{new Date().toDateString()}</TableCell>
            <TableCell className="text-center">
              <Badge
                size="xs"
                className="h-5 bg-gray-200 dark:bg-gray-950"
                variant="tag"
              >
                Private
              </Badge>
            </TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-end">
                <Button size="icon-xs" variant="ghost">
                  <EllipsisIcon />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
