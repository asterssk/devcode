import {
  BookmarkIcon,
  EllipsisIcon,
  FlagIcon,
  UserCheckIcon,
} from "lucide-react";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
type Props = { className?: string };

export function SnippetOptionsMenu({ className }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon-xs" variant="ghost" className={className}>
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg space-y-1"
        align="end"
      >
        <DropdownMenuItem>
          <BookmarkIcon />
          Save to collection
        </DropdownMenuItem>

        <DropdownMenuItem>
          <UserCheckIcon />
          Follow author
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <FlagIcon />
          Report
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
