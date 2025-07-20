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
              <TableHead className="text-center">Term Completed</TableHead>
              <TableHead className="text-center">Interest Rate</TableHead>
              <TableHead>Loan Date</TableHead>
              {(showAll || showAgent) && <TableHead>Agent</TableHead>}
              <TableHead className="text-center">Agent Share</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loans.map((loan, index) => (
              <TableRow key={loan.id}>
                <TableCell className="w-4">{index + 1}</TableCell>
                <TableCell>
                  <Link href={`/loans/${loan.id}`} className="hover:underline">
                    loan-{loan.id?.slice(-4)}
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
                <TableCell>PHP {loan.loan_amount.toLocaleString()}</TableCell>
                <TableCell className="text-center">{loan.term}</TableCell>
                <TableCell className="text-center">
                  {loan.interest_rate}%
                </TableCell>
                <TableCell>{loan.loan_date}</TableCell>
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
                <TableCell className="text-center">
                  {loan.agent_share}%
                </TableCell>
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
