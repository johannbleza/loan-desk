import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import EditAgentDialog from "./EditAgentDialog";
import { Agent } from "@/lib/types/agent";
import Link from "next/link";
import DeleteAgentDialog from "./DeleteAgentDialog";

interface AgentActionsDropdownProps {
  agent: Agent;
  onAction: () => void;
}

const AgentActionsDropdown = ({
  agent,
  onAction,
}: AgentActionsDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col items-start gap-2 px-2 my-2 text-sm w-full">
          <Link href={`/agents/${agent.id}`}>View</Link>
          <EditAgentDialog agent={agent} onEdit={onAction} />
          <DeleteAgentDialog agent={agent} onDelete={onAction} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AgentActionsDropdown;
