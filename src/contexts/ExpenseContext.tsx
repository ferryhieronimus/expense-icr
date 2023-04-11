import { Dispatch, SetStateAction, createContext } from "react";
import { Expense } from "../types/Expense";
import { Paging } from "../types/Paging";

interface ExpenseContextType {
    data?: Expense[];
    paging?: Paging;
    setData: Dispatch<SetStateAction<Expense[]>>;
    setPage: Dispatch<SetStateAction<number>>;
  }

export const ExpenseContext = createContext<ExpenseContextType>(null!);