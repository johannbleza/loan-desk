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
import { format } from "date-fns";
import { formatToPeso } from "@/lib/utils";
import BalanceSheetActionsDropdown from "./EntryActionsDropdown";

interface BalanceSheetListProps {
  balanceSheet: Entry[];
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
                <TableCell>{formatToPeso(entry.balance_in)}</TableCell>
                <TableCell>{formatToPeso(entry.balance_out)}</TableCell>
                <TableCell>
                  {formatToPeso(entry.balance_in - entry.balance_out)}
                </TableCell>
                <TableCell>{entry.remarks}</TableCell>
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
