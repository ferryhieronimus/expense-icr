import { Expense } from "./Expense";
import { Paging } from "./Paging";

export interface ExpenseDTO {
  data: Expense[];
  paging?: Paging;
}
