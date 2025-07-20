import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import LoanActionsDropdown from "../loans/LoanActionsDropdown";
import { format, formatDate } from "date-fns";
import { Payment } from "@/lib/types/payment";
import { formatToPeso } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface PaymentListProps {
  payments: Payment[];
  onAction: () => void;
  showAll?: boolean;
  showClient?: boolean;
  showAgent?: boolean;
}

const PaymentList = ({
  payments,
  onAction,
  showAll,
  showAgent,
  showClient,
}: PaymentListProps) => {
  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold">Payment Schedule</h1>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="text-center">
              <TableHead className="w-8">Term</TableHead>
              <TableHead>Loan ID</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Principal Balance</TableHead>
              <TableHead>Interest Rate</TableHead>
              <TableHead>Monthly Payment</TableHead>
              <TableHead>Interest Paid</TableHead>
              <TableHead>Capital Payment</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Mode of Payment</TableHead>
              <TableHead className="text-right">Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-center">
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="w-4">{payment.term}</TableCell>
                <TableCell>
                  <Link
                    href={`/loans/${payment.id}`}
                    className="hover:underline"
                  >
                    L-{payment.id?.slice(-4).toUpperCase()}
                  </Link>
                </TableCell>
                <TableCell>
                  {formatDate(payment.due_date, "MMM dd, yyyy")}
                </TableCell>
                <TableCell>{formatToPeso(payment.principal_balance)}</TableCell>
                <TableCell>{payment.interest_rate}%</TableCell>
                <TableCell>
                  {formatToPeso(payment.monthly_payment ?? 0)}
                </TableCell>
                <TableCell>
                  {formatToPeso(payment.interest_paid ?? 0)}
                </TableCell>
                <TableCell>{formatToPeso(payment.capital_paid ?? 0)}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="flex items-center justify-end text-right">
                  <Badge variant="outline">Due</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PaymentList;
