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
import { getAgents } from "@/lib/actions/agents";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Agent } from "@/lib/types/agent";
import { getClients } from "@/lib/actions/client";
import { Client } from "@/lib/types/client";
import { editLoan } from "@/lib/actions/loan";
import { toast } from "sonner";
import LoanDatePicker from "./LoanDatePicker";
import { Loan } from "@/lib/types/loan";

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

interface EditLoanDialogProps {
  onEdit: () => void;
  loan: Loan;
  isButton?: boolean;
}

const EditLoanDialog = ({ onEdit, loan, isButton }: EditLoanDialogProps) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string | undefined>(
    loan.agent_id,
  );

  const fetchAgents = async () => {
    setAgents((await getAgents()) ?? []);
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  useEffect(() => {
    const fetchClients = async () => {
      setClients((await getClients(selectedAgentId)) ?? []);
    };
    fetchClients();
  }, [selectedAgentId, loan.client?.name]);

  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agent_id: loan.agent_id ?? "",
      client_id: loan.client_id ?? "",
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
        form.reset();
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
            <Button variant="outline">
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
            <div className="grid grid-cols-2 gap-4 mb-4">
              <FormField
                control={form.control}
                name="agent_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned Agent</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedAgentId(value);
                      }}
                      defaultValue={loan.agent_id}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select an agent" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {agents.map(({ id, name }) => (
                          <SelectItem key={id} value={id!}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={loan.client_id}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a client" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clients.map(({ id, name }) => (
                          <SelectItem key={id} value={id!}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
