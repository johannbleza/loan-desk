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
import { useEffect, useState } from "react";
import AddClientDialog from "@/components/clients/AddClientDialog";
import { Card, CardContent } from "@/components/ui/card";
import { LucideMail, Phone, UserCheck } from "lucide-react";

const AgentPage = () => {
  const params = useParams();
  const { id } = params;

  const [agent, setAgent] = useState<Agent | null>(null);

  const fetchAgent = async () => {
    try {
      setAgent(await getAgent(id as string));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAgent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
            <AddClientDialog onAdd={fetchAgent} agent_id={agent.id} />
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
              <div className="flex gap-4 items-center text-zinc-400">
                <LucideMail />
                <div>
                  <h2>Email</h2>
                  <h2 className="text-black">{agent.email}</h2>
                </div>
              </div>
              <div className="flex gap-4 items-center text-zinc-400">
                <Phone />
                <div>
                  <h2>Phone</h2>
                  <h2 className="text-black">{agent.phone}</h2>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
