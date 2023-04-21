import { createContext } from "react";
import { useSearchParams } from "react-router-dom";

interface ExpenseContextType {
  params: URLSearchParams;
  setParams: any;
}

interface Props {
  children: React.ReactNode;
}

export const ExpenseContext = createContext<ExpenseContextType>(null!);

export const ExpenseProvider = ({ children }: Props) => {

  const [params, setParams] = useSearchParams();

  return (
    <ExpenseContext.Provider value={{ params, setParams }}>
      {children}
    </ExpenseContext.Provider>
  );
}
