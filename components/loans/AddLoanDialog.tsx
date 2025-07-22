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
import { createLoan } from "@/lib/actions/loan";
import { toast } from "sonner";
import LoanDatePicker from "./LoanDatePicker";
import AgentSelect from "../agents/AgentSelect";
import ClientSelect from "../clients/ClientSelect";
import { useState } from "react";

const formSchema = z.object({
  agent_id: z.string().min(1, {
    message: "Agent is required.",
  }),
  client_id: z.string().min(1, {
    message: "Client is required.",
  }),
  loan_amount: z.number().min(1, {
    message: "Loan Amount is required.",
  }),
  term: z.number().min(1, {
    message: "Term is required.",
  }),
  interest_rate: z.number().min(1, {
    message: "Interest Rate is required.",
  }),
  agent_share: z.number().min(0, {
    message: "Agent Share is required.",
  }),
  loan_date: z.string().min(1, { message: "Loan Date is required." }),
});

interface AddLoanDialogProps {
  onAdd: () => void;
  client_id?: string;
  agent_id?: string;
  client_name?: string;
}

const AddLoanDialog = ({ onAdd, client_id, agent_id }: AddLoanDialogProps) => {
  const [selectedAgentId, setSelectedAgentId] = useState(agent_id);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agent_id: agent_id ?? "",
      client_id: client_id ?? "",
      loan_amount: 0,
      term: 0,
      interest_rate: 0,
      agent_share: 0,
      loan_date: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data = await createLoan(values);
      if (data) {
        setOpen(false);
        toast.success("Loan created successfully!", { position: "top-center" });
        form.reset();
        onAdd();
        return;
      }
      toast.error("Error creating loan!", { position: "top-center" });
    } catch (error) {
      toast.error(`Error creating loan! ${error}`, { position: "top-center" });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer"
          onClick={() => {
            setSelectedAgentId(agent_id);
            form.reset();
          }}
        >
          <Plus />
          <span>Create New Loan</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-start">
          <DialogTitle className="text-2xl">Create New Loan</DialogTitle>
          <DialogDescription>
            Please provide the necessary details to create a new loan.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <FormField
                control={form.control}
                name="agent_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned Agent</FormLabel>
                    <AgentSelect
                      defaultAgentId={agent_id}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedAgentId(value);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="client_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <ClientSelect
                      agent_id={selectedAgentId}
                      defaultClientId={client_id}
                      onValueChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                        placeholder="Optional"
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
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={form.formState.isSubmitting}
              >
                Create Loan
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

export default AddLoanDialog;
