import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { Loan } from "@/lib/types/loan";
import EditLoanDialog from "./EditLoanDialog";
import DeleteLoanDialog from "./DeleteLoanDialog";

interface LoanActionsDropdownProps {
  loan: Loan;
  onAction: () => void;
}

const LoanActionsDropdown = ({ loan, onAction }: LoanActionsDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col items-start gap-2 px-2 my-2 text-sm w-full">
          <Link href={`/loans/${loan.id}`}>View</Link>
          <EditLoanDialog loan={loan} onEdit={onAction} />
          <DeleteLoanDialog loan={loan} onDelete={onAction} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LoanActionsDropdown;
