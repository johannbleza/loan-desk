"use client";
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
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Agents</h1>
        <AddAgentDialog onAdd={fetchAgents} />
      </div>
      <AgentList agents={agents} onAction={fetchAgents} />
    </main>
  );
};

export default Page;
