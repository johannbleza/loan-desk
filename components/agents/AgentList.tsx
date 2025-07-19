import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Agent } from "@/lib/types/agent";
import AgentActionsDropdown from "./AgentActionsDropdown";
import Link from "next/link";

interface AgentListProps {
  agents: Agent[];
  onAction: () => void;
}

const AgentList = ({ agents, onAction }: AgentListProps) => {
  console.log(agents);
  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold">All Agents ({agents.length})</h1>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-center">Clients</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent, index) => (
              <TableRow key={agent.id}>
                <TableCell className="w-4">{index + 1}</TableCell>
                <TableCell>
                  <Link
                    href={`/agents/${agent.id}`}
                    className="hover:underline"
                  >
                    {agent.name}
                  </Link>
                </TableCell>
                <TableCell>{agent.email}</TableCell>
                <TableCell>{agent.phone}</TableCell>
                <TableCell className="text-center">
                  {agent.client[0].count}
                </TableCell>
                <TableCell className="flex items-center justify-end text-right">
                  <AgentActionsDropdown agent={agent} onAction={onAction} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AgentList;
