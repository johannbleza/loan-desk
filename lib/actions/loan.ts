"use server";

import { supabase } from "@/utils/supabase";
import { Loan } from "../types/loan";

export const createLoan = async (formData: Loan) => {
  const { data, error } = await supabase.from("loan").insert(formData).select();
  if (error) console.log(error);
  if (data) return data;
};

export const getLoans = async (client_id?: string, agent_id?: string) => {
  try {
    let query = supabase
      .from("loan")
      .select(`*, agent(name), client(name)`)
      .order("created_at", { ascending: true });

    if (client_id) {
      query = query.eq("client_id", client_id);
    } else if (agent_id) {
      query = query.eq("agent_id", agent_id);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching loans:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Failed to get loans:", error);
    throw error;
  }
};

export const getClient = async (client_id: string) => {
  const { data, error } = await supabase
    .from("client")
    .select(`*, agent(name)`)
    .eq("id", client_id);
  if (error) console.log(error);
  if (data) return data[0];
};

export const editLoan = async (loan: Loan) => {
  const { data, error } = await supabase
    .from("loan")
    .update(loan)
    .eq("id", loan.id)
    .select();
  if (error) console.log(error);
  if (data) return data;
};

export const deleteLoan = async (loan: Loan) => {
  const { data, error } = await supabase
    .from("loan")
    .delete()
    .eq("id", loan.id)
    .select();
  if (error) console.log(error);
  if (data) return data;
};
