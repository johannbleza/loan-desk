"use server";

import { supabase } from "@/utils/supabase";
import { Client } from "../types/client";

export const addClient = async (formData: Client) => {
  const { data, error } = await supabase
    .from("client")
    .insert(formData)
    .select();
  if (error) console.log(error);
  if (data) return data;
};

export const getClients = async (agent_id?: string) => {
  if (agent_id) {
    const { data, error } = await supabase
      .from("client")
      .select(`*, agent(name)`)
      .eq("agent_id", agent_id)
      .order("created_at", { ascending: true });

    if (error) console.log(error);
    if (data) return data;
  }
  const { data, error } = await supabase
    .from("client")
    .select(`*, agent(name)`)
    .order("created_at", { ascending: true });

  if (error) console.log(error);
  if (data) return data;
};

export const getClient = async (client_id: string) => {
  const { data, error } = await supabase
    .from("client")
    .select(`*, agent(name)`)
    .eq("id", client_id);
  if (error) console.log(error);
  if (data) return data[0];
};

export const editClient = async (client: Client) => {
  const { data, error } = await supabase
    .from("client")
    .update(client)
    .eq("id", client.id)
    .select();
  if (error) console.log(error);
  if (data) return data;
};

export const deleteClient = async (client: Client) => {
  const { data, error } = await supabase
    .from("client")
    .delete()
    .eq("id", client.id)
    .select();
  if (error) console.log(error);
  if (data) return data;
};
