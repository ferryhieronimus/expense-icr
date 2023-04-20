import ExpenseCard from "../components/ExpenseCard/ExpenseCard";
import CurrentExpense from "../components/CurrentExpense/CurrentExpense";
import FilterPanel from "../components/FilterPanel/FilterPanel";
import PaginationComponent from "../components/Pagination/PaginationComponent";
import {
  getCurrentExpenses,
  getExpensesData,
} from "../services/expenseServices";
import { useState, useEffect } from "react";
import { TotalExpenses } from "../types/TotalExpenses";
import { Paging } from "../types/Paging";
import { Expense } from "../types/Expense";
import { ExpenseContext } from "../contexts/ExpenseContext";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [total, setTotal] = useState<TotalExpenses>({ total: 0 });
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [paging, setPaging] = useState<Paging>();
  const [params, setParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const value = { params, setParams };

  const fetchExpenses = async () => {
    setIsLoading(true);
    try {
      const expensesData = await getExpensesData(params);
      setPaging(expensesData.paging);
      setExpenses(expensesData.data);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCurrentExpenses = async () => {
    const total = await getCurrentExpenses();
    setTotal(total);
  }

  useEffect(() => {
    params.set("limit", "4");
    fetchCurrentExpenses()
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [params]);

  return (
    <ExpenseContext.Provider value={value}>
      <div className='grid grid-cols-3 gap-8 '>
        <div className='grid grid-rows-4 gap-8 col-span-2'>
          {isLoading &&
            [1, 2, 3, 4].map((key) => (
              <ExpenseCard data={undefined} key={key} />
            ))}
          {!isLoading &&
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
    </ExpenseContext.Provider>
  );
}
