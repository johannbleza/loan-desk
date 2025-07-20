"use server";

import { supabase } from "@/utils/supabase";
import { Loan } from "../types/loan";
import { pmt } from "../utils";
import { Payment, PaymentStatus } from "../types/payment";
import { addMonths } from "date-fns";

export const generatePaymentSchedule = async (loan: Loan) => {
  const payments = [];

  const monthly_payment = pmt(
    loan.interest_rate / 100,
    loan.term,
    loan.loan_amount,
  );

  let loan_amount = loan.loan_amount;

  for (let i = 0; i < loan.term; i++) {
    const due_date = addMonths(loan.loan_date, i + 1).toLocaleString();
    const interest_paid = loan_amount * (loan.interest_rate / 100);
    const capital_payment = monthly_payment - interest_paid;

    const payment: Payment = {
      loan_id: loan.id!,
      term: i + 1,
      due_date: due_date,
      principal_balance: loan_amount,
      monthly_payment: monthly_payment,
      interest_paid: interest_paid,
      capital_payment: capital_payment,
    };
    loan_amount = loan_amount - capital_payment;
    payments.push(payment);
  }

  const { data, error } = await supabase
    .from("payment")
    .insert(payments)
    .select();
  if (error) console.log(error);
  if (data) return data;
};

export const getPayments = async (loan_id?: string) => {
  try {
    let query = supabase
      .from("payment")
      .select(
        `
      *,
      loan:loan_id (
        *,
        client:client_id (name),
        agent:agent_id (name)
      )
    `,
      )
      .order("term", { ascending: true });

    if (loan_id) {
      query = query.eq("loan_id", loan_id);
    }
    const { data, error } = await query;

    if (error) {
      console.error("Error fetching payments:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Failed to get payments:", error);
    throw error;
  }
};

export const getLoan = async (loan_id: string) => {
  const { data, error } = await supabase
    .from("loan")
    .select(`*, agent(name), client(name)`)
    .eq("id", loan_id);
  if (error) console.log(error);
  if (data) return data[0];
};

export const updatePaymentStatus = async (payment: PaymentStatus) => {
  const { data, error } = await supabase
    .from("payment")
    .update(payment)
    .eq("id", payment.id)
    .select();
  if (error) console.log(error);
  if (data) return data;
};

export const deletePaymentsByLoanId = async (loan_id: string) => {
  const { data, error } = await supabase
    .from("payment")
    .delete()
    .eq("loan_id", loan_id)
    .select();
  if (error) console.log(error);
  if (data) return data;
};
