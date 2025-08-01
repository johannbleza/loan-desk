"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DeleteAgentDialog from "@/components/agents/DeleteAgentDialog";
import EditAgentDialog from "@/components/agents/EditAgentDialog";
import { getAgent } from "@/lib/actions/agents";
import { Agent } from "@/lib/types/agent";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import AddClientDialog from "@/components/clients/AddClientDialog";
import { Card, CardContent } from "@/components/ui/card";
import { LucideMail, Phone, UserCheck } from "lucide-react";
import ClientList from "@/components/clients/ClientList";
import { getClients } from "@/lib/actions/client";
import { Client } from "@/lib/types/client";
import LoanList from "@/components/loans/LoanList";
import { getLoans } from "@/lib/actions/loan";
import { Loan } from "@/lib/types/loan";

const AgentPage = () => {
  const params = useParams();
  const { id } = params;

  const [agent, setAgent] = useState<Agent | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);

  const fetchAgent = useCallback(async () => {
    try {
      setAgent(await getAgent(id as string));
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const fetchLoans = useCallback(async () => {
    try {
      setLoans((await getLoans("", id as string)) ?? []);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const fetchClients = useCallback(async () => {
    try {
      setClients((await getClients(id as string)) ?? []);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchAgent();
    fetchClients();
    fetchLoans();
  }, [fetchClients, fetchLoans, fetchAgent]);

  if (agent) {
    return (
      <main className="min-h-dvh max-w-[80rem] mx-auto p-6 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-end">
          <div className="flex flex-col gap-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/agents">Agents</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Agent Profile</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-4xl font-bold">{agent.name}</h1>
          </div>
          <div className="flex gap-3">
            <AddClientDialog
              onAdd={fetchClients}
              agent_id={agent.id}
              agent_name={agent.name}
            />
            <EditAgentDialog
              agent={agent}
              onEdit={fetchAgent}
              isButton={true}
            />
            <DeleteAgentDialog
              agent={agent}
              onDelete={fetchAgent}
              isButton={true}
            />
          </div>
        </div>
        <Card>
          <CardContent className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <UserCheck />
              <h1 className="text-2xl font-semibold">Agent Information</h1>
            </div>
            <div className="grid sm:grid-cols-3 gap-2">
              <div className="flex gap-4 items-center text-zinc-500">
                <LucideMail />
                <div>
                  <h2>Email</h2>
                  <h2 className="text-black">{agent.email}</h2>
                </div>
              </div>
              <div className="flex gap-4 items-center text-zinc-500">
                <Phone />
                <div>
                  <h2>Phone</h2>
                  <h2 className="text-black">{agent.phone}</h2>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <ClientList clients={clients} onAction={fetchClients} />
        <LoanList loans={loans} onAction={fetchLoans} showClient={true} />
      </main>
    );
  } else if (agent!) {
    return (
      <main className="flex justify-center items-center mt-40">
        <h1 className="font-bold text-4xl">404 Agent Not Found</h1>
      </main>
    );
  }
};

export default AgentPage;
