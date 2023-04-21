import React from "react";
import { Outlet } from "react-router-dom";
import { ExpenseProvider } from "../contexts/ExpenseContext";

export default function RootLayout() {
  return (
    <ExpenseProvider>
      <div className='bg-gradient-to-r from-light-blue to-deep-blue min-h-screen flex justify-center items-center py-20 px-28'>
        <Outlet />
      </div>
    </ExpenseProvider>
  );
}
