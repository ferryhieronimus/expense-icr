import { ExpenseContext } from "../contexts/ExpenseContext";
import { useContext } from "react";

export function useExpense() {
  return useContext(ExpenseContext);
}
