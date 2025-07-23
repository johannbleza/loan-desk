"use server";

import { supabase } from "@/utils/supabase";
import { Entry } from "../types/entry";

export const addEntry = async (formData: Entry): Promise<Entry | undefined> => {
  const { data, error } = await supabase
    .from("balance_sheet")
    .insert(formData)
    .select();
  if (error) console.log(error);
  if (data) return data[0];
};

export const getEntries = async () => {
  const { data, error } = await supabase
    .from("balance_sheet")
    .select()
    .order("created_at", { ascending: true });

  if (error) console.log(error);

  if (data) return data;
};

export const editEntry = async (entry: Entry) => {
  const { data, error } = await supabase
    .from("balance_sheet")
    .update(entry)
    .eq("id", entry.id)
    .select();
  if (error) console.log(error);
  if (data) return data;
};

export const deleteEntry = async (entry: Entry) => {
  const { data, error } = await supabase
    .from("balance_sheet")
    .delete()
    .eq("id", entry.id)
    .select();
  if (error) console.log(error);
  if (data) return data;
};
