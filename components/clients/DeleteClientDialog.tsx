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
import { Client } from "@/lib/types/client";
import { deleteClient } from "@/lib/actions/client";

interface DeleteClientDialogProps {
  client: Client;
  onDelete: () => void;
  isButton?: boolean;
}

const DeleteClientDialog = ({
  client,
  onDelete,
  isButton,
}: DeleteClientDialogProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    try {
      const data = await deleteClient(client);
      if (data) {
        setOpen(false);
        toast.success("Client deleted successfully!", {
          position: "top-center",
        });
        onDelete();
        if (isButton) router.back();
        return;
      }
      toast.error("Error deleting client!", { position: "top-center" });
    } catch (error) {
      toast.error(`Error deleting client! ${error}`, {
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
            Delete Client?
          </DialogTitle>
          <DialogDescription className="text-start">
            Are you sure you want to delete{" "}
            <span className="font-bold text-black">{client.name}</span>? This
            action cannot be undone and will permanently remove all associated
            data.
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

export default DeleteClientDialog;
