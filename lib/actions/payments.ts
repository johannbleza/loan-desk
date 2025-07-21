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
      .order("due_date", { ascending: true });

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

// HANDLE INTEREST PAID
export const handleInterestPaid = async (payment: Payment) => {
  await addPayment({
    loan_id: payment.loan_id,
    term: payment.term,
    due_date: payment.due_date,
    principal_balance: payment.principal_balance,
    monthly_payment: payment.monthly_payment,
    interest_paid: payment.interest_paid,
    capital_payment: payment.capital_payment,
  });

  await updatePayment({
    id: payment.id,
    loan_id: payment.loan_id,
    term: payment.term,
    due_date: payment.due_date,
    principal_balance: payment.principal_balance,
    monthly_payment: payment.interest_paid,
    interest_paid: payment.interest_paid,
    capital_payment: 0,
  });
};

export const updatePayment = async (payment: Payment) => {
  const { data, error } = await supabase
    .from("payment")
    .update(payment)
    .eq("id", payment.id)
    .select();
  if (error) console.log(error);
  if (data) {
    await handleAdjustMonths(payment);
    return data;
  }
};

export const adjustPrincipalBalance = async (
  payment: PaymentStatus,
  term: number,
) => {
  // Retrieve Rows
  const { data, error } = await supabase
    .from("payment")
    .select()
    .gte("term", term)
    .eq("loan_id", payment.loan_id)
    .order("due_date", { ascending: true });
  if (error) console.log(error);
  if (data) {
    // Update Next Row
    let principal_balance = data[0].principal_balance;
    let capital_payment = data[0].capital_payment;
    for (let i = 1; i < data.length; i++) {
      const nextPayment = data[i];
      principal_balance = principal_balance - capital_payment;
      const interest_paid = principal_balance * 0.1;
      capital_payment = nextPayment.monthly_payment - interest_paid;
      await supabase
        .from("payment")
        .update({
          monthly_payment:
            principal_balance <= 0 ? 0 : nextPayment.monthly_payment,
          principal_balance: principal_balance <= 0 ? 0 : principal_balance,
          interest_paid: principal_balance <= 0 ? 0 : interest_paid,
          capital_payment: principal_balance <= 0 ? 0 : capital_payment,
        })
        .eq("id", nextPayment.id);
    }
    return data;
  }
};

export const addPayment = async (payment: Payment) => {
  const { data, error } = await supabase
    .from("payment")
    .insert(payment)
    .select();
  if (error) console.log(error);
  if (data) return data;
};

export const handleAdjustMonths = async (payment: Payment) => {
  const { data, error } = await supabase
    .rpc("update_payment_due_date", {
      exclude_payment_id: payment.id,
      reference_due_date: payment.due_date,
    })
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
