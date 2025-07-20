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
}

const LoanList = ({ loans, onAction, showAll }: LoanListProps) => {
  console.log(loans);
  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold">
          {showAll ? "All" : "Client"} Loans ({loans.length})
        </h1>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8"></TableHead>
              <TableHead>Loan ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Loan Amount</TableHead>
              <TableHead className="text-center">Term Completed</TableHead>
              <TableHead className="text-center">Interest Rate</TableHead>
              <TableHead>Loan Date</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead className="text-center">Agent Share</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loans.map((loan, index) => (
              <TableRow key={loan.id}>
                <TableCell className="w-4">{index + 1}</TableCell>
                <TableCell>
                  <Link
                    href={`/clients/${loan.id}`}
                    className="hover:underline"
                  >
                    loan-{loan.id?.slice(-4)}
                  </Link>
                </TableCell>
                <TableCell>{loan.client?.name}</TableCell>
                <TableCell>PHP {loan.loan_amount.toLocaleString()}</TableCell>
                <TableCell className="text-center">{loan.term}</TableCell>
                <TableCell className="text-center">
                  {loan.interest_rate}%
                </TableCell>
                <TableCell>{loan.loan_date}</TableCell>
                <TableCell>{loan.agent?.name}</TableCell>
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
