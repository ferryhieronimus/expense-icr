import ExpenseCard from "../components/ExpenseCard/ExpenseCard";
import CurrentExpense from "../components/CurrentExpense/CurrentExpense";
import FilterPanel from "../components/FilterPanel/FilterPanel";
import PaginationComponent from "../components/Pagination/PaginationComponent";
import {
  getCurrentExpenses,
  getExpensesData,
} from "../services/expenseServices";
import { useState, useEffect, useContext } from "react";
import { TotalExpenses } from "../types/TotalExpenses";
import { Paging } from "../types/Paging";
import { Expense } from "../types/Expense";
import { ExpenseContext } from "../contexts/ExpenseContext";

export default function Home() {
  const [total, setTotal] = useState<TotalExpenses>({ total: 0 });
  const [expenses, setExpenses] = useState<Expense[] | null>(null);
  const [paging, setPaging] = useState<Paging>();
  const expenseContext = useContext(ExpenseContext);

  useEffect(() => {
    expenseContext.params.forEach((key, value) => {
      expenseContext.params.set(value, key);
    })
    expenseContext.params.set("limit", "4");
    getCurrentExpenses().then((total) => {
      setTotal(total);
    });
  }, []);

  useEffect(() => {    
    setExpenses(null);
    getExpensesData(expenseContext.params)
      .then((expensesData) => {
        setPaging(expensesData.paging);
        setExpenses(expensesData.data);
      })
      .catch((error) => {
        setExpenses([]);
      });
  }, [expenseContext]);

  return (
    <div className='grid grid-cols-3 gap-8 '>
      <div className='grid grid-rows-4 gap-8 col-span-2'>
        {expenses === null &&
          [1, 2, 3, 4].map((key) => <ExpenseCard data={undefined} key={key} />)}
        {expenses &&
          expenses.map((expense) => (
            <ExpenseCard data={expense} key={expense.id} />
          ))}
      </div>
      <div className='grid grid-rows-4 gap-8'>
        <div className='row-span-1'>
          <CurrentExpense total={total} />
        </div>
        <div className='row-span-3'>
          <FilterPanel />
        </div>
      </div>
      <div className='col-span-2'>
        <div className='flex justify-center'>
          <PaginationComponent paging={paging} />
        </div>
      </div>
    </div>
  );
}
