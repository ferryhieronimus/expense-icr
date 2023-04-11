import axios from "axios";
import { ExpenseDTO } from "../types/ExpenseDTO";
import { TotalExpenses } from "../types/TotalExpenses";
import { Category } from "../types/Category";
import { Expense } from "../types/Expense";

const baseUrl =
  "https://utbmu5o3smxuba2iverkgqqj440temhn.lambda-url.ap-southeast-1.on.aws/expenses";

export const getExpensesData = async (
  page?: number,
  min_price?: number,
  max_price?: number,
  category_id?: string
) => {
  const config = {
    params: {
      min_price,
      max_price,
      category_id,
      limit: 4,
      page,
    },
  };
  const response = await axios.get<ExpenseDTO>(baseUrl, config);
  return response.data;
};

export const getCurrentExpenses = async () => {
  const response = await axios.get<TotalExpenses>(`${baseUrl}/total`);
  return response.data;
};

export const getExpensesDetails = async (id: string) => {
  const response = await axios.get<Expense>(`${baseUrl}/${id}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get<Category[]>(`${baseUrl}/category`);
  return response.data;
};
