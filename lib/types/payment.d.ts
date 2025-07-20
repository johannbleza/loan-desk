export interface Payment {
  id?: string;
  loan_id: string;
  term: number;
  due_date: string;
  principal_balance: number;
  interest_rate?: number;
  monthly_payment?: number;
  interest_paid?: number;
  capital_paid?: number;
  agent_share?: number;
  payment_date?: string;
  payment_mode?: string;
  remarks?: string;
}
