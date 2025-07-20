"use server";

import { supabase } from "@/utils/supabase";
import { Client } from "../types/client";
import { Loan } from "../types/loan";

export const createLoan = async (formData: Loan) => {
  const { data, error } = await supabase.from("loan").insert(formData).select();
  if (error) console.log(error);
  if (data) return data;
};

export const getLoans = async (client_id?: string) => {
  if (client_id) {
    const { data, error } = await supabase
      .from("loan")
      .select(`*, agent(name), client(name)`)
      .eq("client_id", client_id)
      .order("created_at", { ascending: true });

    if (error) console.log(error);
    if (data) return data;
  }
  const { data, error } = await supabase
    .from("client")
    .select(`*, agent(name), client(name)`)
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
