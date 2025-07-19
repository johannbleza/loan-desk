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
import ClientActionsDropdown from "../clients/ClientActionsDropdown";
import { Loan } from "@/lib/types/loan";

interface LoanListProps {
  loans: Loan[];
  onAction: () => void;
  showAll?: boolean;
}

const LoanList = ({ loans, onAction, showAll }: LoanListProps) => {
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
              <TableHead>Loan Amount</TableHead>
              <TableHead>Term Completed</TableHead>
              <TableHead className="text-center">Interest Rate</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {loans.map((client, index) => ( */}
            {/*   <TableRow key={client.id}> */}
            {/*     <TableCell className="w-4">{index + 1}</TableCell> */}
            {/*     <TableCell> */}
            {/*       <Link */}
            {/*         href={`/clients/${client.id}`} */}
            {/*         className="hover:underline" */}
            {/*       > */}
            {/*         {client.name} */}
            {/*       </Link> */}
            {/*     </TableCell> */}
            {/*     <TableCell>{client.email}</TableCell> */}
            {/*     <TableCell>{client.phone}</TableCell> */}
            {/*     {showAll && ( */}
            {/*       <TableCell> */}
            {/*         <Link */}
            {/*           href={`/agents/${client.agent_id}`} */}
            {/*           className="hover:underline" */}
            {/*         > */}
            {/*           {client.agent?.name} */}
            {/*         </Link> */}
            {/*       </TableCell> */}
            {/*     )} */}
            {/*     <TableCell className="text-center">0</TableCell> */}
            {/*     <TableCell className="flex items-center justify-end text-right"> */}
            {/*       <ClientActionsDropdown client={client} onAction={onAction} /> */}
            {/*     </TableCell> */}
            {/*   </TableRow> */}
            {/* ))} */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LoanList;
