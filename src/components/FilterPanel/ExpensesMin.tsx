import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import { useState, useContext, useEffect } from "react";
import { ExpenseContext } from "../../contexts/ExpenseContext";

export default function ExpensesMin() {
  const expenseContext = useContext(ExpenseContext);
  const [min, setMin] = useState(expenseContext.params.get("min_price") || "");

  useEffect(() => {
    if (min) {
      expenseContext.params.set("min_price", min);
    } else {
      expenseContext.params.delete("min_price");
    }
    expenseContext.setParams(expenseContext.params);
  }, [min]);

  return (
    <FormControl sx={{ m: 1, width: "10ch" }} variant='outlined'>
      <OutlinedInput
        id='range'
        type={"text"}
        size='small'
        onChange={(e) => setMin(e.target.value)}
        value={min}
      />
    </FormControl>
  );
}
