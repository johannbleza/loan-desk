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
  updatePaymentStatus,
} from "@/lib/actions/payments";

interface UpdatePaymentStatusDialogProps {
  onEdit: () => void;
  payment: Payment;
}

const UpdatePaymentStatusDialog = ({
  onEdit,
  payment,
}: UpdatePaymentStatusDialogProps) => {
  const [remarks, setRemarks] = useState(payment.remarks);
  const formSchema = z.object({
    remarks: z.string().min(1, {
      message: "Payment status is required.",
    }),
    payment_mode:
      remarks == "Due"
        ? z.string().optional()
        : z.string().min(1, {
            message: "Mode of payment is required.",
          }),
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
    values: {
      remarks: payment.remarks!,
      payment_mode: payment.payment_mode ?? "",
      payment_date: payment.payment_date ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      id: payment.id!,
      ...values,
      payment_mode: remarks === "Due" ? null : values.payment_mode,
      payment_date: remarks === "Due" ? null : values.payment_date,
    };
    try {
      const data = await updatePaymentStatus(payload);

      // Handle Partial Payments
      if (remarks == "Interest Paid") {
        await handleInterestPaid(payment);
      }
      if (data) {
        setOpen(false);
        toast.success("Payment updated successfully!", {
          position: "top-center",
        });

        console.log(data);

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
            <FormField
              control={form.control}
              name="payment_mode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mode of Payment</FormLabel>
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
              <Button type="submit" className="cursor-pointer">
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
