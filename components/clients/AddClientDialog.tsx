"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { toast } from "sonner";
import { addClient } from "@/lib/actions/client";
import AgentSelect from "../agents/AgentSelect";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  agent_id: z.string().min(1, {
    message: "Agent is required.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().optional(),
  phone: z.string().optional(),
});

interface AddClientDialogProps {
  onAdd: () => void;
  agent_id?: string;
  agent_name?: string;
}

const AddClientDialog = ({ onAdd, agent_id }: AddClientDialogProps) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      agent_id: agent_id ?? "",
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data = await addClient(values);
      if (data) {
        setOpen(false);
        toast.success("Client added successfully!", { position: "top-center" });
        router.push(`/clients/${data.id}`);
        onAdd();
        return;
      }
      toast.error("Error adding client!", { position: "top-center" });
    } catch (error) {
      toast.error(`Error adding client! ${error}`, { position: "top-center" });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" onClick={() => form.reset()}>
          <Plus />
          <span>Add Client</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-start">
          <DialogTitle className="text-2xl">Add New Client</DialogTitle>
          <DialogDescription>
            Please provide the necessary details to add a new client.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="agent_id"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>Assigned Agent *</FormLabel>
                  <AgentSelect
                    defaultAgentId={agent_id}
                    onValueChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., john.doe@example.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., +63 917 123 4567"
                      {...field}
                      type="tel"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3">
              <Button type="submit" className="cursor-pointer">
                Add Client
              </Button>
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClientDialog;
