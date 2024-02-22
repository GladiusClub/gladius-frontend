import React, { useRef } from "react";
import FormControl from "@mui/material/FormControl";
import MuiOutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";

import "./outlinedInput.css";

const OutlinedInput = ({ field, onBlur, endAdornment }) => {
  const inputRef = useRef(null);

  const handleBlur = () => {
    onBlur(field.name, inputRef.current?.value);
  };

  return (
    <FormControl variant="outlined" className="w-full my-2 text-default">
      <InputLabel className="text-default font-manrope font-light">
        {field.label}
      </InputLabel>
      <MuiOutlinedInput
        {...{ ...field, error: !!field.error }}
        inputRef={inputRef}
        inputProps={{
          className: "text-default font-light font-manrope",
        }}
        onBlur={handleBlur}
        endAdornment={endAdornment}
      />
      <FormHelperText className="text-secondary ml-0 h-3">
        {field.error}
      </FormHelperText>
    </FormControl>
  );
};

export default OutlinedInput;
