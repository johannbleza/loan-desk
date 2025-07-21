"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
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
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoanDatePicker from "../loans/LoanDatePicker";
import { Badge } from "../ui/badge";
import { Payment } from "@/lib/types/payment";
import { isBefore } from "date-fns";
import { paymentStatus } from "@/lib/constants";
import { toast } from "sonner";
import {
  handleInterestPaid,
  adjustPrincipalBalance,
  updatePaymentStatus,
  handleCapitalPaymentLessThan,
} from "@/lib/actions/payments";
import { formatToPeso } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";

interface UpdatePaymentStatusDialogProps {
  onEdit: () => void;
  payment: Payment;
}

const UpdatePaymentStatusDialog = ({
  onEdit,
  payment,
}: UpdatePaymentStatusDialogProps) => {
  const [remarks, setRemarks] = useState(payment.remarks);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const formSchema = z.object({
    remarks: z.string().min(1, {
      message: "Payment status is required.",
    }),
    interest_paid: z.number().max(payment.interest_paid, {
      message: `Interest is only ${formatToPeso(payment.interest_paid)}`,
    }),
    capital_payment: z.number().max(payment.principal_balance, {
      message: `Principal balance is only ${formatToPeso(payment.principal_balance)}`,
    }),
    payment_mode: z.string().optional(),
    payment_date:
      remarks == "Due"
        ? z.string().optional()
        : z.string().min(1, {
            message: "Payment date is required.",
          }),
  });
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      remarks: payment.remarks!,
      interest_paid: 0,
      capital_payment: 0,
      payment_mode: payment.payment_mode ?? "",
      payment_date: payment.payment_date ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const monthly_payment = values.capital_payment + values.interest_paid;
    const payload: Payment = {
      ...values,
      interest_paid:
        remarks === "Due" ? payment.interest_paid : values.interest_paid,
      capital_payment:
        remarks === "Due" ? payment.capital_payment : values.capital_payment,
      monthly_payment:
        remarks === "Due" ? payment.monthly_payment : monthly_payment,
      payment_mode: remarks === "Due" ? null : values.payment_mode,
      payment_date: remarks === "Due" ? null : values.payment_date,
      //
      id: payment.id,
      term: payment.term,
      due_date: payment.due_date,
      principal_balance: payment.principal_balance,
      loan_id: payment.loan_id,
    };
    try {
      const data = await updatePaymentStatus(payload);
      // If Interest is only Paid
      if (
        values.interest_paid == payment.interest_paid &&
        values.capital_payment == 0
      ) {
        await handleInterestPaid(payment);
      } else if (values.capital_payment > payment.capital_payment) {
        //Greater than
        await adjustPrincipalBalance(payload);
      } else if (values.capital_payment < payment.capital_payment) {
        //Less Than
        const test = await handleCapitalPaymentLessThan(payment);
        console.log(test);
      }

      // Adjust Principal Balance
      if (data) {
        setOpen(false);
        toast.success("Payment updated successfully!", {
          position: "top-center",
        });
        onEdit();
        return;
      }
      toast.error("Error updating payment!", { position: "top-center" });
    } catch (error) {
      toast.error(`Error updating payment! ${error}`, {
        position: "top-center",
      });
    }
  };
  const now = new Date();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Badge
          className="cursor-pointer"
          variant={payment.remarks != "Due" ? "secondary" : "outline"}
          onClick={() => {
            form.reset();
          }}
        >
          <span>
            {payment.remarks == "Due" && isBefore(payment.due_date, now)
              ? "Overdue"
              : payment.remarks}
          </span>
        </Badge>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-start">
          <DialogTitle className="text-2xl">Update Payment Status</DialogTitle>
          <DialogDescription>
            Please provide the necessary details to update status.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Status</FormLabel>
                  <Select
                    value={field.value}
                    defaultValue={payment.remarks}
                    onValueChange={(value) => {
                      if (value == "Paid") {
                        form.setValue("interest_paid", payment.interest_paid);
                        form.setValue(
                          "capital_payment",
                          payment.capital_payment,
                        );

                        setMonthlyPayment(
                          form.getValues("interest_paid") +
                            form.getValues("capital_payment"),
                        );
                      } else {
                        form.setValue("interest_paid", 0);
                        form.setValue("capital_payment", 0);
                        setMonthlyPayment(
                          form.getValues("interest_paid") +
                            form.getValues("capital_payment"),
                        );
                      }
                      field.onChange(value);
                      setRemarks(value);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select payment status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {paymentStatus.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="interest_paid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Checkbox
                        checked={field.value !== 0}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange(payment.interest_paid);
                            setRemarks("Paid");
                            form.setValue("remarks", "Paid");
                          } else {
                            field.onChange(0);
                            if (
                              form.getValues("capital_payment") == 0 &&
                              form.getValues("interest_paid") == 0
                            ) {
                              form.setValue("remarks", "Due");
                            }
                          }
                          setMonthlyPayment(
                            form.getValues("capital_payment") +
                              (checked ? payment.interest_paid : 0),
                          );
                        }}
                      />
                      <span>Interest Paid</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        readOnly={true}
                        value={field.value === 0 ? "" : field.value}
                        placeholder={formatToPeso(payment.interest_paid)}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capital_payment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Checkbox
                        checked={field.value !== 0}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange(payment.capital_payment);
                            form.setValue("remarks", "Paid");

                            setRemarks("Paid");

                            form.setValue(
                              "interest_paid",
                              payment.interest_paid,
                            );
                          } else {
                            field.onChange(0);
                            if (
                              form.getValues("capital_payment") == 0 &&
                              form.getValues("interest_paid") == 0
                            ) {
                              form.setValue("remarks", "Due");
                            }
                          }
                          setMonthlyPayment(
                            form.getValues("interest_paid") +
                              (checked ? payment.capital_payment : 0),
                          );
                        }}
                      />
                      <span>Capital Payment</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        value={field.value === 0 ? "" : field.value}
                        placeholder={formatToPeso(payment.capital_payment)}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value));
                          form.setValue("remarks", "Paid");
                          form.setValue("interest_paid", payment.interest_paid);

                          setMonthlyPayment(
                            form.getValues("interest_paid") +
                              Number(e.target.value),
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormDescription>
              Monthly Payment: {formatToPeso(monthlyPayment)}
            </FormDescription>
            <FormField
              control={form.control}
              name="payment_mode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mode of Payment (Optional) </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., Bank Transfer, GCash, etc."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payment_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Date</FormLabel>
                  <LoanDatePicker
                    onChange={field.onChange}
                    value={field.value ?? ""}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3">
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={form.formState.isSubmitting}
              >
                Update
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

export default UpdatePaymentStatusDialog;
