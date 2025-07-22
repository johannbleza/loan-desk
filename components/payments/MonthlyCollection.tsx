"use client";
import { formatDate } from "date-fns";
import PaymentList from "./PaymentList";
import MonthYearPicker from "./MonthYearPicker";
import { useEffect, useState } from "react";
import { getPaymentsByMonthYear } from "@/lib/actions/payments";
import { Payment } from "@/lib/types/payment";

const MonthlyCollection = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const test = (
    <div className="text-2xl sm:text-3xl font-semibold flex flex-col sm:flex-row gap-2 justify-between w-60 sm:w-full">
      <h1>Monthly Collection - {formatDate(currentDate, "MMMM yyyy")}</h1>
      <MonthYearPicker onChange={(value) => setCurrentDate(value)} />
    </div>
  );
  const [payments, setPayments] = useState<Payment[]>([]);

  const fetchPayments = async () => {
    try {
      setPayments((await getPaymentsByMonthYear(currentDate)) ?? []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  return (
    <div>
      <PaymentList
        monthPicker={test}
        payments={payments}
        onAction={fetchPayments}
        showIndex={true}
        showAll={true}
      />
    </div>
  );
};

export default MonthlyCollection;
