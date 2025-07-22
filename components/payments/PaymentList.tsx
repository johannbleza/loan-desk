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
import { format, formatDate } from "date-fns";
import { Payment } from "@/lib/types/payment";
import { formatToPeso } from "@/lib/utils";
import UpdatePaymentStatusDialog from "./UpdatePaymentStatusDialog";

interface PaymentListProps {
  title?: string;
  payments: Payment[];
  onAction: () => void;
  showAll?: boolean;
  showClient?: boolean;
  showAgent?: boolean;
  showLoan?: boolean;
  showTerm?: boolean;
  showIndex?: boolean;
  showTotal?: boolean;
  showCollected?: boolean;
  monthPicker?: React.ReactNode;
}

const PaymentList = ({
  title,
  payments,
  onAction,
  showAll,
  showAgent,
  showClient,
  showLoan,
  showTerm,
  showIndex,
  showTotal,
  showCollected,
  monthPicker,
}: PaymentListProps) => {
  const collectedPayments = payments.filter((p) => p.remarks !== "Due");
  console.log(payments);

  return (
    <Card>
      <CardHeader>
        {monthPicker}
        <h1 className="text-2xl font-semibold">{title}</h1>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="text-center">
              {showIndex && <TableHead className="w-8"></TableHead>}
              {showTerm && <TableHead className="w-8">Term</TableHead>}
              {(showAll || showLoan) && <TableHead>Loan ID</TableHead>}
              {(showAll || showClient) && <TableHead>Client</TableHead>}
              <TableHead>Due Date</TableHead>
              <TableHead>Principal Balance</TableHead>
              <TableHead>Interest Rate</TableHead>
              <TableHead>Monthly Payment</TableHead>
              <TableHead>Interest Paid</TableHead>
              <TableHead>Capital Payment</TableHead>
              {(showAll || showAgent) && <TableHead>Agent</TableHead>}
              <TableHead>Payment Date</TableHead>
              <TableHead>Mode of Payment</TableHead>
              <TableHead className="text-right">Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment, index) => (
              <TableRow
                key={payment.id}
                className={
                  payment.remarks != "Due" ? "font-semibold" : "text-zinc-500"
                }
              >
                {showTerm && (
                  <TableCell className="w-4">{payment.term}</TableCell>
                )}
                {showIndex && <TableCell>{index + 1}</TableCell>}
                {(showAll || showLoan) && (
                  <TableCell>
                    <Link
                      href={`/loans/${payment.loan_id}`}
                      className="hover:underline"
                    >
                      L-{payment.loan_id?.slice(-4).toUpperCase()}
                    </Link>
                  </TableCell>
                )}
                {(showAll || showClient) && (
                  <TableCell>
                    <Link
                      href={`/clients/${payment.loan?.client_id}`}
                      className="hover:underline"
                    >
                      {payment.loan?.client?.name}
                    </Link>
                  </TableCell>
                )}
                <TableCell>
                  {formatDate(payment.due_date, "MMM d, yyyy")}
                </TableCell>
                <TableCell>{formatToPeso(payment.principal_balance)}</TableCell>
                <TableCell>{payment.loan?.interest_rate}%</TableCell>
                <TableCell>
                  {formatToPeso(payment.monthly_payment ?? 0)}
                </TableCell>
                <TableCell>
                  {formatToPeso(payment.interest_paid ?? 0)}
                </TableCell>
                <TableCell>
                  {formatToPeso(payment.capital_payment ?? 0)}
                </TableCell>
                {(showAll || showAgent) && (
                  <TableCell>
                    <Link
                      href={`/agents/${payment.loan?.agent_id}`}
                      className="hover:underline"
                    >
                      {payment.loan?.agent?.name}
                    </Link>
                  </TableCell>
                )}
                <TableCell>
                  {payment.payment_date &&
                    format(payment.payment_date, "MMM d, yyyy")}
                </TableCell>
                <TableCell>{payment.payment_mode}</TableCell>
                <TableCell className="flex items-center justify-end text-right">
                  <UpdatePaymentStatusDialog
                    onEdit={onAction}
                    payment={payment}
                  />
                </TableCell>
              </TableRow>
            ))}
            {showTotal && (
              <TableRow className="font-semibold">
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="text-start">Total:</TableCell>
                <TableCell>
                  {formatToPeso(
                    payments.reduce(
                      (sum, p) => sum + (p.monthly_payment ?? 0),
                      0,
                    ),
                  )}
                </TableCell>
                <TableCell>
                  {formatToPeso(
                    payments.reduce(
                      (sum, p) => sum + (p.interest_paid ?? 0),
                      0,
                    ),
                  )}
                </TableCell>
                <TableCell>
                  {formatToPeso(
                    payments.reduce(
                      (sum, p) => sum + (p.capital_payment ?? 0),
                      0,
                    ),
                  )}
                </TableCell>
              </TableRow>
            )}
            {showCollected && (
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="text-start">Collected:</TableCell>
                <TableCell>
                  {formatToPeso(
                    collectedPayments.reduce(
                      (sum, p) => sum + (p.monthly_payment ?? 0),
                      0,
                    ),
                  )}
                </TableCell>
                <TableCell>
                  {formatToPeso(
                    collectedPayments.reduce(
                      (sum, p) => sum + (p.interest_paid ?? 0),
                      0,
                    ),
                  )}
                </TableCell>
                <TableCell>
                  {formatToPeso(
                    collectedPayments.reduce(
                      (sum, p) => sum + (p.capital_payment ?? 0),
                      0,
                    ),
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PaymentList;
