import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

export default function ExpensesRange() {
  return (
    <FormControl sx={{ m: 1, width: "10ch" }} variant='outlined'>
      <OutlinedInput
        id='outlined-adornment-password'
        type={"text"}
        size="small"
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              edge='end'
            ></IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
