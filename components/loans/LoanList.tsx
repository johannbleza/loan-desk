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
import { Loan } from "@/lib/types/loan";
import LoanActionsDropdown from "./LoanActionsDropdown";
import { format } from "date-fns";
import { formatToPeso } from "@/lib/utils";

interface LoanListProps {
  loans: Loan[];
  onAction: () => void;
  showAll?: boolean;
  showClient?: boolean;
  showAgent?: boolean;
}

const LoanList = ({
  loans,
  onAction,
  showAll,
  showAgent,
  showClient,
}: LoanListProps) => {
  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold">
          {showAll ? "All" : showClient ? "Handled" : "Client"} Loans (
          {loans.length})
        </h1>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8"></TableHead>
              <TableHead>Loan ID</TableHead>
              {(showAll || showClient) && <TableHead>Client</TableHead>}
              <TableHead>Loan Amount</TableHead>
              <TableHead>Term Completed</TableHead>
              <TableHead>Interest Rate</TableHead>
              <TableHead>Loan Date</TableHead>
              {(showAll || showAgent) && <TableHead>Agent</TableHead>}
              <TableHead>Agent Share</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loans.map((loan, index) => (
              <TableRow key={loan.id}>
                <TableCell className="w-4">{index + 1}</TableCell>
                <TableCell>
                  <Link href={`/loans/${loan.id}`} className="hover:underline">
                    L-{loan.id?.slice(-4).toUpperCase()}
                  </Link>
                </TableCell>
                {(showAll || showClient) && (
                  <TableCell>
                    <Link
                      href={`/clients/${loan.client_id}`}
                      className="hover:underline"
                    >
                      {loan.client?.name}
                    </Link>
                  </TableCell>
                )}
                <TableCell>{formatToPeso(loan.loan_amount)}</TableCell>
                <TableCell>{loan.term}</TableCell>
                <TableCell>{loan.interest_rate}%</TableCell>
                <TableCell>{format(loan.loan_date, "MMM dd, yyyy")}</TableCell>
                {(showAll || showAgent) && (
                  <TableCell>
                    <Link
                      href={`/agents/${loan.agent_id}`}
                      className="hover:underline"
                    >
                      {loan.agent?.name}
                    </Link>
                  </TableCell>
                )}
                <TableCell>{loan.agent_share}%</TableCell>
                <TableCell className="flex items-center justify-end text-right">
                  <LoanActionsDropdown loan={loan} onAction={onAction} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LoanList;
