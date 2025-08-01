"use server";

import { supabase } from "@/utils/supabase";
import { Client } from "../types/client";

export const addClient = async (
  formData: Client,
): Promise<Client | undefined> => {
  const { data, error } = await supabase
    .from("client")
    .insert(formData)
    .select();
  if (error) console.log(error);
  if (data) return data[0];
};

export const getClients = async (agent_id?: string) => {
  let query = supabase
    .from("client")
    .select(`*, agent(name), loan(count)`)
    .order("created_at", { ascending: true });

  if (agent_id) query = query.eq("agent_id", agent_id);

  const { data, error } = await query;

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
