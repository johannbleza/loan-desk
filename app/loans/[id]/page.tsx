"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Loan } from "@/lib/types/loan";
import { getLoan } from "@/lib/actions/loan";
import EditLoanDialog from "@/components/loans/EditLoanDialog";
import DeleteLoanDialog from "@/components/loans/DeleteLoanDialog";
import { format } from "date-fns";
import { Payment } from "@/lib/types/payment";
import { formatToPeso } from "@/lib/utils";
import PaymentList from "@/components/payments/PaymentList";
import { getPayments } from "@/lib/actions/payments";
import ResetPaymentsDialog from "@/components/loans/ResetPaymentsDialog";

const LoanPage = () => {
  const params = useParams();
  const { id } = params;

  const [loan, setLoan] = useState<Loan | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);

  const fetchData = useCallback(async () => {
    try {
      setPayments((await getPayments(id as string)) ?? []);
      setLoan(await getLoan(id as string));
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [id, fetchData]);

  if (loan) {
    return (
      <main className="min-h-dvh max-w-[80rem] mx-auto p-6 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-end">
          <div className="flex flex-col gap-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/loans">Loans</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Loan Details</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-4xl font-bold">
              Loan ID: L-{loan.id?.slice(-4).toUpperCase()}
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <ResetPaymentsDialog loan={loan} onReset={fetchData} />
            <EditLoanDialog loan={loan} onEdit={fetchData} isButton={true} />
            <DeleteLoanDialog
              loan={loan}
              onDelete={fetchData}
              isButton={true}
            />
          </div>
        </div>
        <Card>
          <CardContent className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <h1 className="text-2xl font-semibold">Loan Details</h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <h2>Client:</h2>
                <Link href={`/clients/${loan.client_id}`}>
                  <h2 className="text-black font-semibold hover:underline">
                    {loan.client?.name}
                  </h2>
                </Link>
              </div>
              <div>
                <h2>Loan Start Date:</h2>
                <h2 className="text-black font-semibold">
                  {format(loan.loan_date, "MMM dd, yyyy")}
                </h2>
              </div>
              <div>
                <h2>Loan Amount:</h2>
                <h2 className="text-black font-semibold">
                  {formatToPeso(loan.loan_amount)}
                </h2>
              </div>
              <div>
                <h2>Loan Term:</h2>
                <h2 className="text-black font-semibold">{loan.term}</h2>
              </div>
              <div>
                <h2>Interest:</h2>
                <h2 className="text-black font-semibold">
                  {loan.interest_rate}%
                </h2>
              </div>
              <div>
                <h2>Assigned Agent:</h2>
                <Link href={`/agents/${loan.agent_id}`}>
                  <h2 className="text-black hover:underline font-semibold">
                    {loan.agent!.name}
                  </h2>
                </Link>
              </div>
              <div>
                <h2>Agent Share:</h2>
                <h2 className="text-black font-semibold">
                  {loan.agent_share}%
                </h2>
              </div>
              <div>
                <h2>Term Completed:</h2>
                <h2 className="text-black font-semibold">
                  {loan.payment[0].count}/{payments.length}
                </h2>
              </div>
            </div>
          </CardContent>
        </Card>
        <PaymentList
          title="Payment Schedule"
          showTerm={true}
          payments={payments}
          onAction={fetchData}
          showTotal={true}
          showCollected={true}
        />
      </main>
    );
  } else if (loan!) {
    return (
      <main className="flex justify-center items-center mt-40">
        <h1 className="font-bold text-4xl">404 Loan Not Found</h1>
      </main>
    );
  }
};

export default LoanPage;
