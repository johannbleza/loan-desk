import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Entry } from "@/lib/types/entry";
import { compareAsc, format } from "date-fns";
import { formatToPeso } from "@/lib/utils";
import BalanceSheetActionsDropdown from "./EntryActionsDropdown";
import Link from "next/link";
import { Loan } from "@/lib/types/loan";
import { Payment } from "@/lib/types/payment";
import { useMemo } from "react";

interface BalanceSheetListProps {
  entries: Entry[];
  loans: Loan[];
  payments: Payment[];
  onAction: () => void;
}

const BalanceSheetList = ({
  entries,
  loans,
  payments,
  onAction,
}: BalanceSheetListProps) => {
  const data: Entry[] = useMemo(() => {
    const combined: Entry[] = [
      ...entries,
      ...loans.map((loan) => ({
        id: loan.id,
        entry_date: loan.loan_date,
        balance_out: loan.loan_amount,
        remarks: `Loan: L-${loan.id?.slice(-3).toUpperCase()}, ${loan.client?.name}`,
        balance_in: 0,
        isLoan: true,
      })),
      ...payments.map((payment) => ({
        id: payment.id,
        loan_id: payment.loan_id,
        entry_date: payment.payment_date ?? "",
        balance_out: 0,
        remarks: `Monthly Payment: ${payment.loan?.client?.name}, Term: ${payment.term}/${payment.loan?.term}`,
        balance_in: payment.monthly_payment,
        isPayment: true,
      })),
    ];
    combined.sort((a, b) => compareAsc(a.entry_date, b.entry_date));
    return combined;
  }, [entries, loans, payments]);

  return (
    <Card className="">
      <CardHeader>
        <h1 className="text-2xl font-semibold">
          All Entries ({entries.length})
        </h1>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8"></TableHead>
              <TableHead>Date</TableHead>
              <TableHead>IN</TableHead>
              <TableHead>OUT</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Remarks</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((entry, index) => (
              <TableRow key={entry.id}>
                <TableCell className="w-4">{index + 1}</TableCell>
                <TableCell>
                  {format(entry.entry_date, "MMM dd, yyyy")}
                </TableCell>
                <TableCell>{formatToPeso(entry.balance_in)}</TableCell>
                <TableCell>{formatToPeso(entry.balance_out)}</TableCell>
                <TableCell>
                  {formatToPeso(entry.balance_in - entry.balance_out)}
                </TableCell>
                <TableCell>
                  {entry.isLoan || entry.isPayment ? (
                    <Link
                      href={`/loans/${entry.isLoan ? entry.id : entry.loan_id}`}
                      className="hover:underline"
                    >
                      {entry.remarks}
                    </Link>
                  ) : (
                    entry.remarks
                  )}
                </TableCell>
                <TableCell className="flex items-center justify-end text-right">
                  <BalanceSheetActionsDropdown
                    entry={entry}
                    onAction={onAction}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BalanceSheetList;
