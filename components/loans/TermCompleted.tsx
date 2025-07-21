import { getPayments } from "@/lib/actions/payments";
import { Loan } from "@/lib/types/loan";
import { Payment } from "@/lib/types/payment";
import { useEffect, useState } from "react";

interface TermCompletedProps {
  loan: Loan;
}

const TermCompleted = ({ loan }: TermCompletedProps) => {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setPayments((await getPayments(loan.id as string)) ?? []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPayments();
  }, [loan.id]);
  return (
    <div>
      {loan.payment[0].count}/{payments.length}
    </div>
  );
};

export default TermCompleted;
