import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import DeleteAgentDialog from "./DeleteEntryDialog";
import { Entry } from "@/lib/types/entry";
import EditEntryDialog from "./EditEntryDialog";

interface BalanceSheetActionsDropdownProps {
  entry: Entry;
  onAction: () => void;
}

const BalanceSheetActionsDropdown = ({
  entry: entry,
  onAction,
}: BalanceSheetActionsDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col items-start gap-2 px-2 my-2 text-sm w-full">
          <EditEntryDialog entry={entry} onAdd={onAction} />
          <DeleteAgentDialog entry={entry} onDelete={onAction} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BalanceSheetActionsDropdown;
