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
import LoanDatePicker from "../loans/LoanDatePicker";
import { addEntry } from "@/lib/actions/balanceSheet";

const formSchema = z.object({
  entry_date: z.string().min(1, { message: "Loan Date is required." }),
  balance_in: z.number(),
  balance_out: z.number(),
  remarks: z.string(),
});

interface AddEntryDialogProps {
  onAdd: () => void;
  isButton?: boolean;
}

const AddEntryDialog = ({ onAdd, isButton }: AddEntryDialogProps) => {
  const date = new Date();
  const today = date.toLocaleDateString();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entry_date: today,
      balance_in: 0,
      balance_out: 0,
      remarks: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data = await addEntry(values);
      if (data) {
        setOpen(false);
        toast.success("Entry added successfully!", { position: "top-center" });
        onAdd();
        return;
      }
      toast.error("Error adding entry!", { position: "top-center" });
    } catch (error) {
      console.log(error);
      toast.error(`Error adding entry! ${error}`, { position: "top-center" });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isButton ? (
          <Button className="cursor-pointer" onClick={() => form.reset()}>
            <Plus />
            <span>New Entry</span>
          </Button>
        ) : (
          <div className="cursor-pointer p-2 text-sm hover:bg-zinc-100 rounded-lg">
            New Agent
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="text-start">
        <DialogHeader className="text-start">
          <DialogTitle className="text-2xl">Add New Entry</DialogTitle>
          <DialogDescription>
            Please provide the necessary details to add a new entry.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="entry_date"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Date *</FormLabel>
                  <LoanDatePicker
                    onChange={field.onChange}
                    defaultValue={field.value}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="balance_in"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Balance IN</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        value={field.value === 0 ? "" : field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="balance_out"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Balance OUT</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        value={field.value === 0 ? "" : field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3">
              <Button type="submit" className="cursor-pointer">
                Add Entry
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

export default AddEntryDialog;
