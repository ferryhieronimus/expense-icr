import { Dispatch, SetStateAction, createContext } from "react";
import { Expense } from "../types/Expense";
import { Paging } from "../types/Paging";

interface ExpenseContextType {
    params: URLSearchParams;
    setParams: any;
  }

export const ExpenseContext = createContext<ExpenseContextType>(null!);