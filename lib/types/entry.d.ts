export interface Entry {
  id?: string;
  entry_date: string;
  balance_in: number;
  balance_out: number;
  remarks?: string;
  isLoan?: boolean;
  isPayment?: boolean;
  loan_id?: string;
}

export function sortEntriesByDateAsc(entries: Entry[]): Entry[] {
  return [...entries].sort(
    (a, b) =>
      new Date(a.entry_date).getTime() - new Date(b.entry_date).getTime(),
  );
}
