import React, { useEffect, useContext } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { Paging } from "../../types/Paging";
import { useSearchParams } from "react-router-dom";

const PaginationComponent = ({ paging }: { paging: Paging | undefined }) => {
  const [params, setParams] = useSearchParams();
  const [pageCount, setPageCount] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (paging) {
      setPageCount(paging?.pageCount)
      setPage(paging?.page)
    }
  }, [paging])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    params.set("page", value.toString());
    setParams(params);
  };

  const styling = {
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
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={pageCount}
        page={page}
        boundaryCount={1}
        onChange={handleChange}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            shape='rounded'
            variant='outlined'
            sx={styling}
          />
        )}
      />
    </Stack>
  );
};

export default PaginationComponent;
