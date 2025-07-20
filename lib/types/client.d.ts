export interface Client {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  agent_id: string;
  agent?: { name?: string };
  loan?: Array;
}
