export interface Loan {
  id?: string;
  client_id: string;
  agent_id: string;
  loan_amount: number;
  term: number;
  interest_rate: number;
  agent_share: number;
  loan_date: string;
}
