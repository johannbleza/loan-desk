"use server";

import { supabase } from "@/utils/supabase";
import { Agent } from "../types/agent";

export const addAgent = async (formData: Agent) => {
  const { data, error } = await supabase
    .from("agent")
    .insert(formData)
    .select();
  if (error) console.log(error);
  if (data) return data;
};

export const getAgents = async () => {
  const { data, error } = await supabase
    .from("agent")
    .select(
      `
      *,
      no_clients:client(count)
    `,
    )
    .order("created_at", { ascending: true });

  if (error) console.log(error);

  if (data) return data;
};

export const getAgent = async (agent_id: string) => {
  const { data, error } = await supabase
    .from("agent")
    .select()
    .eq("id", agent_id);
  if (error) console.log(error);
  if (data) return data[0];
};

export const editAgent = async (agent: Agent) => {
  const { data, error } = await supabase
    .from("agent")
    .update(agent)
    .eq("id", agent.id)
    .select();
  if (error) console.log(error);
  if (data) return data;
};

export const deleteAgent = async (agent: Agent) => {
  const { data, error } = await supabase
    .from("agent")
    .delete()
    .eq("id", agent.id)
    .select();
  if (error) console.log(error);
  if (data) return data;
};
