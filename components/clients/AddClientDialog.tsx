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
import { addAgent } from "@/lib/actions/agents";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().optional(),
  phone: z.string().optional(),
});

interface AddClientDialogProps {
  onAdd: () => void;
}

const AddClientDialog = ({ onAdd }: AddClientDialogProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const agent = await addAgent(values);
      if (agent) {
        setOpen(false);
        toast.success("Agent added successfully!", { position: "top-center" });
        form.reset();
        onAdd();
        return;
      }
      toast.error("Error adding agent!", { position: "top-center" });
    } catch (error) {
      toast.error(`Error adding agent! ${error}`, { position: "top-center" });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Plus />
          <span>Add Client</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New Client</DialogTitle>
          <DialogDescription>
            Please provide the necessary details to add a new client.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                Add Agent
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
