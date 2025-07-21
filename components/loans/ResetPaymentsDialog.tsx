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
import { RotateCcw } from "lucide-react";
import { Loan } from "@/lib/types/loan";
import { resetLoan } from "@/lib/actions/loan";

interface DeleteLoanDialogProps {
  loan: Loan;
  onReset: () => void;
}

const ResetPaymentsDialog = ({ loan, onReset }: DeleteLoanDialogProps) => {
  const [open, setOpen] = useState(false);
  const handleReset = async () => {
    try {
      await resetLoan(loan);
      setOpen(false);
      toast.success("Payments reset successfully!", {
        position: "top-center",
      });
      onReset();
      return;
    } catch (error) {
      toast.error(`Error reseting loan! ${error}`, {
        position: "top-center",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer" asChild>
        <Button>
          <RotateCcw />
          <span>Reset Payments</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-100">
        <DialogHeader>
          <DialogTitle className="text-2xl text-start">
            Reset Payments?
          </DialogTitle>
          <DialogDescription className="text-start">
            Are you sure you want to reset{" "}
            <span className="font-bold text-black">
              L-{loan.id?.slice(-4).toUpperCase()}
            </span>{" "}
            payments? This action cannot be undone and will permanently remove
            all associated data.
          </DialogDescription>
          <div className="flex gap-3 mt-2">
            <Button className="cursor-pointer" onClick={handleReset}>
              Confirm Reset
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

export default ResetPaymentsDialog;
