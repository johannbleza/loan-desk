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

interface ClientListProps {
  clients: Client[];
  onAction: () => void;
  showAll?: boolean;
}

const ClientList = ({ clients, onAction, showAll }: ClientListProps) => {
  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold">
          {showAll ? "All" : "Agent"} Clients ({clients.length})
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
              {showAll && <TableHead>Assigned Agent</TableHead>}
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
                {showAll && (
                  <TableCell>
                    <Link
                      href={`/agents/${client.agent_id}`}
                      className="hover:underline"
                    >
                      {client.agent?.name}
                    </Link>
                  </TableCell>
                )}
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
