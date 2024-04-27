import React from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import MuiSelect from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import "./select.css";

const selectProps = {
  inputProps: {
    className: "text-default font-light font-manrope",
    required: true,
    autoComplete: "off",
  },
  MenuProps: {
    PaperProps: {
      style: {
        maxHeight: "12rem",
        borderRadius: 0,
      },
    },
  },
  sx: {
    ".MuiSelect-icon": {
      color: "var(--color-default)",
    },
  },
};

const Select = ({ error, children, onBlur, onChange, ...restProps }) => {
  return (
    <FormControl variant="outlined" className="w-full text-default">
      <InputLabel className="text-sm text-default font-manrope font-light">
        {restProps.label}
      </InputLabel>
      <MuiSelect
        {...restProps}
        {...selectProps}
        onBlur={(e) => {
          onBlur?.(e.target.name, e.target.value);
        }}
        onChange={(e) => {
          onChange(e.target.name, e.target.value);
        }}
      >
        {children}
      </MuiSelect>
      <FormHelperText
        className="text-secondary min-h-5 ml-0"
        aria-live="assertive"
      >
        {error}
      </FormHelperText>
    </FormControl>
  );
};

export default Select;
