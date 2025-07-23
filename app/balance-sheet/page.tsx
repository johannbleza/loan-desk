"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import LoanList from "@/components/loans/LoanList";
import { Loan } from "@/lib/types/loan";
import { getLoans } from "@/lib/actions/loan";
import AddBalanceSheetDialog from "@/components/balance-sheet/AddBalanceSheet";

const Page = () => {
  const [loans, setLoans] = useState<Loan[]>([]);

  const fetchLoans = async () => {
    try {
      setLoans((await getLoans()) ?? []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

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
        <AddBalanceSheetDialog
          onAdd={() => console.log("hello")}
          isButton={true}
        />
      </div>
      <LoanList showAll={true} loans={loans} onAction={fetchLoans} />
    </main>
  );
};

export default Page;
