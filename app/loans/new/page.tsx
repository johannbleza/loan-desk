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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createLoan } from "@/lib/actions/loan";
import { toast } from "sonner";
import LoanDatePicker from "@/components/loans/LoanDatePicker";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import AgentSelect from "@/components/agents/AgentSelect";
import ClientSelect from "@/components/clients/ClientSelect";

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
  term: z
    .number()
    .min(1, {
      message: "Term is required.",
    })
    .max(99, { message: "Max limit exceeded." }),
  interest_rate: z.number().min(1, {
    message: "Interest Rate is required.",
  }),
  agent_share: z.number().min(0, {
    message: "Agent Share is required.",
  }),
  loan_date: z.string().min(1, { message: "Loan Date is required." }),
});

const AddLoanPage = () => {
  const router = useRouter();
  const [selectedAgentId, setSelectedAgentId] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agent_id: "",
      client_id: "",
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
        toast.success("Loan created successfully!", { position: "top-center" });
        form.reset();
        router.push(`/loans/${data.id}`);
        return;
      }
      toast.error("Error creating loan!", { position: "top-center" });
    } catch (error) {
      toast.error(`Error creating loan! ${error}`, { position: "top-center" });
    }
  };
  return (
    <div className="flex justify-center items-center mt-12 p-4">
      <Card className="w-[40rem]">
        <CardContent>
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Create New Loan</h1>
            <p className="text-slate-400 text-sm">
              Please provide the necessary details to create a new loan.
            </p>
          </div>
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
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
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
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
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
                          placeholder="Optional"
                          {...field}
                          value={field.value === 0 ? "" : field.value}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
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
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    router.back();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddLoanPage;
