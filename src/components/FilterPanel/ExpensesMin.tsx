import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import { useState, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function ExpensesMin() {
  const [params, setParams] = useSearchParams();
  const [min, setMin] = useState(params.get("min_price") || "");

  useEffect(() => {
    if (min) {
      params.set("min_price", min);
    } else {
      params.delete("min_price");
    }
    setParams(params);
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
