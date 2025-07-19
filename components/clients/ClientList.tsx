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
import { Client } from "@/lib/types/client";
import ClientActionsDropdown from "./ClientActionsDropdown";

interface AgentListProps {
  clients: Client[];
  onAction: () => void;
}

const ClientList = ({ clients, onAction }: AgentListProps) => {
  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold">
          Agent Clients ({clients.length})
        </h1>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-center">Loans</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client, index) => (
              <TableRow key={client.id}>
                <TableCell className="w-4">{index + 1}</TableCell>
                <TableCell>
                  <Link
                    href={`/clients/${client.id}`}
                    className="hover:underline"
                  >
                    {client.name}
                  </Link>
                </TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell className="text-center">0</TableCell>
                <TableCell className="flex items-center justify-end text-right">
                  <ClientActionsDropdown client={client} onAction={onAction} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ClientList;
