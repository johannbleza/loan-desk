import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { toast } from "sonner";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Loan } from "@/lib/types/loan";
import { deleteLoan } from "@/lib/actions/loan";

interface DeleteLoanDialogProps {
  loan: Loan;
  onDelete: () => void;
  isButton?: boolean;
}

const DeleteLoanDialog = ({
  loan,
  onDelete,
  isButton,
}: DeleteLoanDialogProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    try {
      const data = await deleteLoan(loan);
      if (data) {
        setOpen(false);
        toast.success("Loan deleted successfully!", {
          position: "top-center",
        });
        onDelete();
        if (isButton) router.back();
        return;
      }
      toast.error("Error deleting loan!", { position: "top-center" });
    } catch (error) {
      toast.error(`Error deleting loan! ${error}`, {
        position: "top-center",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {isButton ? (
        <DialogTrigger className="cursor-pointer" asChild>
          <Button variant="secondary">
            <Trash />
            <span>Delete</span>
          </Button>
        </DialogTrigger>
      ) : (
        <DialogTrigger className="cursor-pointer">Delete</DialogTrigger>
      )}
      <DialogContent className="w-100">
        <DialogHeader>
          <DialogTitle className="text-2xl text-start">
            Delete Loan?
          </DialogTitle>
          <DialogDescription className="text-start">
            Are you sure you want to delete{" "}
            <span className="font-bold text-black">
              loan-{loan.id?.slice(-4)}
            </span>
            This action cannot be undone and will permanently remove all
            associated data.
          </DialogDescription>
          <div className="flex gap-3">
            <Button className="cursor-pointer" onClick={handleDelete}>
              Confirm Delete
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteLoanDialog;
