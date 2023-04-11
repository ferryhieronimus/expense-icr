import React, { ChangeEvent, useEffect, useContext } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { Paging } from "../../types/Paging";
import { ExpenseContext } from "../../contexts/ExpenseContext";
import { getExpensesData } from "../../services/expenseServices";

const PaginationComponent = ({ paging }: { paging: Paging | undefined }) => {
  const expenseContext = useContext(ExpenseContext);
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number | undefined>(1);

  useEffect(() => {
    setPageCount(paging?.pageCount);
  });

  console.log(page);
  
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    expenseContext.setData([]);
    getExpensesData(value).then((expenses) => {
      expenseContext.setData(expenses.data);
    });
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={pageCount}
        onChange={handleChange}
        page={page}
        boundaryCount={1}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            shape='rounded'
            variant='outlined'
            sx={{
              bgcolor: "#FFFFFF",
              "&:hover": {
                bgcolor: "#DFE3E8",
              },
              "&.Mui-selected": {
                borderColor: "#19A7CE",
                bgcolor: "#19A7CE",
                color: "#FFF",
              },
              "&.Mui-selected:hover": {
                borderColor: "#146C94",
                bgcolor: "#146C94",
              },
            }}
          />
        )}
      />
    </Stack>
  );
};

export default PaginationComponent;
