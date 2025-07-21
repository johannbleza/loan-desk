import { Loan } from "./loan";

export interface Payment {
  id?: string;
  loan_id: string;
  term: number;
  due_date: string;
  principal_balance: number;
  interest_rate?: number; // culprit
  monthly_payment: number;
  interest_paid: number;
  capital_payment: number;
  agent_share?: number;
  payment_date?: string;
  payment_mode?: string;
  remarks?: string;
  loan?: Loan;
}

export interface PaymentStatus {
  id?: string;
  loan_id?: string;
  principal_balance: number;
  monthly_payment?: number;
  interest_paid: number;
  capital_payment: number;
  payment_date?: string | null;
  payment_mode?: string | null;
  remarks: string;
}
