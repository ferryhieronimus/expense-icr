import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import { useState, useContext, useEffect } from "react";
import { ExpenseContext } from "../../contexts/ExpenseContext";

export default function ExpensesMax() {
  const expenseContext = useContext(ExpenseContext);
  const [max, setMax] = useState(expenseContext.params.get("max_price"));

  useEffect(() => {
    if (max) {
      expenseContext.params.set("max_price", max);
      expenseContext.setParams(expenseContext.params);
    } else {
      expenseContext.params.delete("max_price");
      expenseContext.setParams(expenseContext.params);
    }
  }, [max]);

  return (
    <FormControl sx={{ m: 1, width: "10ch" }} variant='outlined'>
      <OutlinedInput
        id='range'
        type={"text"}
        size='small'
        onChange={(e) => setMax(e.target.value)}
        value={max}
      />
    </FormControl>
  );
}
