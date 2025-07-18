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
