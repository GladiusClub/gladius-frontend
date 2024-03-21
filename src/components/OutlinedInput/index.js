import React, { useRef } from "react";
import FormControl from "@mui/material/FormControl";
import MuiOutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";

import "./outlinedInput.css";

const OutlinedInput = ({ field, onBlur, endAdornment }) => {
  const inputRef = useRef(null);
  const { error, autoComplete, ...rest } = field;

  const handleBlur = () => {
    onBlur(field.name, inputRef.current?.value);
  };

  return (
    <FormControl variant="outlined" className="w-full text-default">
      <InputLabel
        className="text-default font-manrope font-light"
        aria-label={field.label}
      >
        {field.label}
      </InputLabel>
      <MuiOutlinedInput
        {...rest}
        inputRef={inputRef}
        onBlur={handleBlur}
        error={!!error}
        autoComplete={autoComplete}
        inputProps={{
          className: "text-default font-light font-manrope",
        }}
        endAdornment={endAdornment}
        aria-invalid={!!field.error}
        aria-describedby={field.name || field.label}
      />
      <FormHelperText
        className="text-secondary ml-0 min-h-5"
        aria-live="assertive"
      >
        {field.error}
      </FormHelperText>
    </FormControl>
  );
};

export default OutlinedInput;
