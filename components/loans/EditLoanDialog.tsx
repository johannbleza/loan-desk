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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { editLoan } from "@/lib/actions/loan";
import { toast } from "sonner";
import LoanDatePicker from "./LoanDatePicker";
import { Loan } from "@/lib/types/loan";

const formSchema = z.object({
  loan_amount: z.number().min(1, {
    message: "Loan Amount is required.",
  }),
  term: z
    .number()
    .min(1, {
      message: "Term is required.",
    })
    .max(99, { message: "Term limit exceeded." }),
  interest_rate: z.number().min(1, {
    message: "Interest Rate is required.",
  }),
  agent_share: z.number().min(0, {
    message: "Agent Share is required.",
  }),
  loan_date: z.string().min(1, { message: "Loan Date is required." }),
});

interface EditLoanDialogProps {
  onEdit: () => void;
  loan: Loan;
  isButton?: boolean;
}

const EditLoanDialog = ({ onEdit, loan, isButton }: EditLoanDialogProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      loan_amount: loan.loan_amount,
      term: loan.term,
      interest_rate: loan.interest_rate,
      agent_share: loan.agent_share,
      loan_date: loan.loan_date,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const data = await editLoan({ id: loan.id, ...values });
      if (data) {
        setOpen(false);
        toast.success("Loan updated successfully!", { position: "top-center" });
        onEdit();
        return;
      }
      toast.error("Error updating loan!", { position: "top-center" });
    } catch (error) {
      toast.error(`Error updating loan! ${error}`, { position: "top-center" });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isButton ? (
          <DialogTrigger className="cursor-pointer" asChild>
            <Button variant="outline" onClick={() => form.reset()}>
              <Edit />
              <span>Edit</span>
            </Button>
          </DialogTrigger>
        ) : (
          <DialogTrigger className="cursor-pointer">Edit</DialogTrigger>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-start">
          <DialogTitle className="text-2xl">Edit Loan Details</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="loan_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value === 0 ? "" : field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="term"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Term (Months)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
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
                name="interest_rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interest Rate (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
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
                name="agent_share"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agent Share (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
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
                name="loan_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loan Date</FormLabel>
                    <LoanDatePicker
                      onChange={field.onChange}
                      value={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-3">
              <Button type="submit" className="cursor-pointer">
                Save Changes
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

export default EditLoanDialog;
