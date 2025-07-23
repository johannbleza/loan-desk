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
import AddBalanceSheetDialog from "@/components/balance-sheet/AddBalanceSheet";
import BalanceSheetList from "@/components/balance-sheet/BalanceSheetList";
import { BalanceSheet } from "@/lib/types/balanceSheet";
import { getBalanceSheet } from "@/lib/actions/balanceSheet";

const Page = () => {
  const [balanceSheet, setBalanceSheet] = useState<BalanceSheet[]>([]);

  const fetchBalanceSheet = async () => {
    try {
      setBalanceSheet((await getBalanceSheet()) ?? []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBalanceSheet();
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
        <AddBalanceSheetDialog onAdd={fetchBalanceSheet} isButton={true} />
      </div>
      <BalanceSheetList
        balanceSheet={balanceSheet}
        onAction={fetchBalanceSheet}
      />
    </main>
  );
};

export default Page;
