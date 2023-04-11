export interface Expense {
  id: string;
  name: string;
  amount: number;
  description: string;
  created_at: Date;
  category: {
    name: string;
  };
}
