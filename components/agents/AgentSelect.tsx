"use client";
import { Agent } from "@/lib/types/agent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getAgents } from "@/lib/actions/agents";
import { useState, useEffect } from "react";
import Link from "next/link";

interface AgentSelectProps {
  defaultAgentId?: string;
  onValueChange: (value: string) => void;
}

const AgentSelect = ({ defaultAgentId, onValueChange }: AgentSelectProps) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const fetchAgents = async () => {
    setAgents((await getAgents()) ?? []);
  };

  useEffect(() => {
    fetchAgents();
  }, []);
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultAgentId}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an agent" />
      </SelectTrigger>
      <SelectContent>
        {agents.map(({ id, name }) => (
          <SelectItem key={id} value={id!}>
            {name}
          </SelectItem>
        ))}
        <Link
          className="p-2 text-sm hover:underline text-slate-700"
          href={"/agents/new"}
        >
          New Agent
        </Link>
      </SelectContent>
    </Select>
  );
};

export default AgentSelect;
