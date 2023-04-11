import React from "react";
import ExpenseCard from "../components/ExpenseCard/ExpenseCard";
import CurrentExpense from "../components/CurrentExpense/CurrentExpense";
import FilterPanel from "../components/FilterPanel/FilterPanel";
import PaginationComponent from "../components/Pagination/PaginationComponent";
import {
  getCurrentExpenses,
  getExpensesData,
  getExpensesDetails,
} from "../services/expenseServices";
import { useState, useEffect } from "react";
import { TotalExpenses } from "../types/TotalExpenses";
import { Paging } from "../types/Paging";
import { Expense } from "../types/Expense";
import { ExpenseContext } from "../contexts/ExpenseContext";

export default function Home() {
  const [total, setTotal] = useState<TotalExpenses>({ total: 0 });
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [paging, setPaging] = useState<Paging>();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    getCurrentExpenses().then((total) => {
      setTotal(total);
    });
    getExpensesData(page).then((expensesData) => {
      setPaging(expensesData.paging);
      setExpenses(expensesData.data);
    });
  }, []);

  return (
    <div className='grid grid-cols-3 gap-8 '>
      <div className='grid grid-rows-4 gap-8 col-span-2'>
        <ExpenseCard data={expenses && expenses[0]} />
        <ExpenseCard data={expenses && expenses[1]} />
        <ExpenseCard data={expenses && expenses[2]} />
        <ExpenseCard data={expenses && expenses[3]} />
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
          <ExpenseContext.Provider
            value={{
              data: expenses,
              paging: paging,
              setData: setExpenses,
              setPage: setPage
            }}
          >
            <PaginationComponent paging={paging} />
          </ExpenseContext.Provider>
        </div>
      </div>
    </div>
  );
}
