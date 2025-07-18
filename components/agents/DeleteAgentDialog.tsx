import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Agent } from "@/lib/types/agent";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { deleteAgent } from "@/lib/actions/agents";
import { toast } from "sonner";

interface DeleteAgentDialogProps {
  agent: Agent;
  onDelete: () => void;
}

const DeleteAgentDialog = ({ agent, onDelete }: DeleteAgentDialogProps) => {
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    try {
      const deletedAgent = await deleteAgent(agent);
      if (deletedAgent) {
        setOpen(false);
        toast.success("Agent deleted successfully!", {
          position: "top-center",
        });
        onDelete();
        return;
      }
      toast.error("Error deleting agent!", { position: "top-center" });
    } catch (error) {
      toast.error(`Error deleting agent! ${error}`, { position: "top-center" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer">Delete</DialogTrigger>
      <DialogContent className="w-100">
        <DialogHeader>
          <DialogTitle className="text-2xl">Delete Agent?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-bold text-black">{agent.name}</span>? This
            action cannot be undone and will permanently remove all associated
            data.
          </DialogDescription>
          <div className="flex gap-3">
            <Button className="cursor-pointer" onClick={handleDelete}>
              Delete
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

export default DeleteAgentDialog;
