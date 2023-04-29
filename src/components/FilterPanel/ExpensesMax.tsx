import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import { useState, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function ExpensesMax() {
  const [params, setParams] = useSearchParams();
  const [max, setMax] = useState(params.get("max_price") || "");

  useEffect(() => {
    if (max) {
      params.set("max_price", max);
    } else {
      params.delete("max_price");
    }
    setParams(params);
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
