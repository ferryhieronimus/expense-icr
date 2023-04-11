import React from "react";
import { Outlet } from "react-router-dom";
import { ExpenseContext } from "../contexts/ExpenseContext";
import { useSearchParams } from "react-router-dom";

export default function RootLayout() {
  const [params, setParams] = useSearchParams()
  const value = {
    params, setParams
  }
  return (
    <ExpenseContext.Provider value={value}>
      <div className='bg-gradient-to-r from-light-blue to-deep-blue min-h-screen flex justify-center items-center py-20 px-28'>
        <Outlet />
      </div>
    </ExpenseContext.Provider>
  );
}
