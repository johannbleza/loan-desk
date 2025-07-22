import { getClients } from "@/lib/actions/client";
import { Client } from "@/lib/types/client";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Link from "next/link";

interface ClientSelectProps {
  agent_id?: string;
  defaultClientId?: string;
  onValueChange: (value: string) => void;
}

const ClientSelect = ({
  agent_id,
  defaultClientId,
  onValueChange,
}: ClientSelectProps) => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      setClients((await getClients(agent_id)) ?? []);
    };
    fetchClients();
  }, [agent_id]);

  return (
    <Select onValueChange={onValueChange} defaultValue={defaultClientId}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a client" />
      </SelectTrigger>
      <SelectContent>
        {clients.map(({ id, name }) => (
          <SelectItem key={id} value={id!}>
            {name}
          </SelectItem>
        ))}
        <Link
          className="p-2 text-sm hover:underline text-slate-700"
          href={"/clients/new"}
        >
          New Client
        </Link>
      </SelectContent>
    </Select>
  );
};

export default ClientSelect;
