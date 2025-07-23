"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useCallback, useEffect, useState } from "react";
import AddEntryDialog from "@/components/balance-sheet/AddEntryDialog";
import BalanceSheetList from "@/components/balance-sheet/BalanceSheetList";
import { Entry } from "@/lib/types/entry";
import { getEntries } from "@/lib/actions/balanceSheet";
import { getLoans } from "@/lib/actions/loan";
import { Loan } from "@/lib/types/loan";
import { Payment } from "@/lib/types/payment";
import { getPaymentsPaid } from "@/lib/actions/payments";

const Page = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  const fetchData = useCallback(async () => {
    try {
      setEntries((await getEntries()) ?? []);
      setLoans((await getLoans()) ?? []);
      setPayments((await getPaymentsPaid()) ?? []);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main className="min-h-dvh max-w-[80rem] mx-auto p-6 flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Balance Sheet</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-4xl font-bold">Balance Sheet</h1>
        </div>
        <AddEntryDialog onAdd={fetchData} isButton={true} />
      </div>
      <BalanceSheetList
        entries={entries}
        loans={loans}
        payments={payments}
        onAction={fetchData}
      />
    </main>
  );
};

export default Page;
