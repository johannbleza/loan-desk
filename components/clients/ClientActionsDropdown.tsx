import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { Client } from "@/lib/types/client";
import DeleteClientDialog from "./DeleteClientDialog";
import EditClientDialog from "./EditClientDialog";

interface ClientActionsDropdownProps {
  client: Client;
  onAction: () => void;
}

const ClientActionsDropdown = ({
  client,
  onAction,
}: ClientActionsDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col items-start gap-2 px-2 my-2 text-sm w-full">
          <Link href={`/clients/${client.id}`}>View</Link>
          <EditClientDialog client={client} onEdit={onAction} />
          <DeleteClientDialog client={client} onDelete={onAction} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ClientActionsDropdown;
