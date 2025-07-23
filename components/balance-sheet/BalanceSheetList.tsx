import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AgentActionsDropdown from "../agents/AgentActionsDropdown";
import Link from "next/link";
import { BalanceSheet } from "@/lib/types/balanceSheet";
import { format } from "date-fns";

interface BalanceSheetListProps {
  balanceSheet: BalanceSheet[];
  onAction: () => void;
}

const BalanceSheetList = ({
  balanceSheet,
  onAction,
}: BalanceSheetListProps) => {
  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold">
          All Entries ({balanceSheet.length})
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
            {balanceSheet.map((entry, index) => (
              <TableRow key={entry.id}>
                <TableCell className="w-4">{index + 1}</TableCell>
                <TableCell>
                  {format(entry.entry_date, "MMM dd, yyyy")}
                </TableCell>
                <TableCell>{entry.balance_in}</TableCell>
                <TableCell>{entry.balance_out}</TableCell>
                <TableCell>{entry.balance_in - entry.balance_out}</TableCell>
                <TableCell>{entry.remarks}</TableCell>
                <TableCell className="flex items-center justify-end text-right">
                  {/* <AgentActionsDropdown agent={entry} onAction={onAction} /> */}
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
