import ExpenseCard from "../components/ExpenseCard/ExpenseCard";
import CurrentExpense from "../components/CurrentExpense/CurrentExpense";
import FilterPanel from "../components/FilterPanel/FilterPanel";
import PaginationComponent from "../components/Pagination/PaginationComponent";
import {
  getCurrentExpenses,
  getExpensesData,
} from "../services/expenseServices";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const [params, setParams] = useSearchParams();

  const fetchExpenses = async () => {
    try {
      params.set("limit", "4");
      setParams(params);
      const expensesData = await getExpensesData(params);
      return expensesData;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCurrentExpenses = async () => {
    const total = await getCurrentExpenses();    
    return total;
  };

  const expensesQuery = useQuery({
    queryKey: [
      "expenses",
      params.get("page"),
      params.get("category_id"),
      params.get("max_price"),
      params.get("min_price"),
    ],
    queryFn: fetchExpenses,
  });

  const totalExpenseQuery = useQuery({
    queryKey: ["totalExpenses"],
    queryFn: fetchCurrentExpenses,
  });

  console.log("mounted");

  return (
    <div className='grid grid-cols-3 gap-8 '>
      <div className='grid grid-rows-4 gap-8 col-span-2'>
        {expensesQuery.isLoading &&
          [1, 2, 3, 4].map((key) => <ExpenseCard data={undefined} key={key} />)}
        {!expensesQuery.isLoading &&
          expensesQuery.data?.data.map((expense) => (
            <ExpenseCard data={expense} key={expense.id} />
          ))}
      </div>
      <div className='grid grid-rows-4 gap-8'>
        <div className='row-span-1'>
          <CurrentExpense total={totalExpenseQuery.data} />
        </div>
        <div className='row-span-3'>
          <FilterPanel />
        </div>
      </div>
      <div className='col-span-2'>
        <div className='flex justify-center'>
          <PaginationComponent paging={expensesQuery.data?.paging} />
        </div>
      </div>
    </div>
  );
}
