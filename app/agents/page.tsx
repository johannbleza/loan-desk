"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import AddAgentDialog from "@/components/agents/AddAgentDialog";
import AgentList from "@/components/agents/AgentList";
import { getAgents } from "@/lib/actions/agents";
import { Agent } from "@/lib/types/agent";
import { useEffect, useState } from "react";

const Page = () => {
  const [agents, setAgents] = useState<Agent[]>([]);

  const fetchAgents = async () => {
    setAgents((await getAgents()) ?? []);
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <main className="min-h-dvh max-w-[80rem] mx-auto p-6 flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Agents</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-4xl font-bold">Agents</h1>
        </div>
        <AddAgentDialog onAdd={fetchAgents} />
      </div>
      <AgentList agents={agents} onAction={fetchAgents} />
    </main>
  );
};

export default Page;
