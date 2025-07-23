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
import AddEntryDialog from "@/components/balance-sheet/AddEntryDialog";
import BalanceSheetList from "@/components/balance-sheet/BalanceSheetList";
import { Entry } from "@/lib/types/entry";
import { getEntries } from "@/lib/actions/balanceSheet";

const Page = () => {
  const [balanceSheet, setBalanceSheet] = useState<Entry[]>([]);

  const fetchBalanceSheet = async () => {
    try {
      setBalanceSheet((await getEntries()) ?? []);
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
        <AddEntryDialog onAdd={fetchBalanceSheet} isButton={true} />
      </div>
      <BalanceSheetList
        balanceSheet={balanceSheet}
        onAction={fetchBalanceSheet}
      />
    </main>
  );
};

export default Page;
