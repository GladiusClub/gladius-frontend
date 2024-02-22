import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

export const UserAdornment = () => {
  return (
    <InputAdornment position="end">
      <IconButton edge="end" className=" text-default">
        <Person2OutlinedIcon />
      </IconButton>
    </InputAdornment>
  );
};

export const EmailAdornment = () => {
  return (
    <InputAdornment position="end">
      <IconButton edge="end" className=" text-default">
        <EmailOutlinedIcon />
      </IconButton>
    </InputAdornment>
  );
};

export const PasswordAdornment = ({ onPasswordVisibilityClick }) => {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    onPasswordVisibilityClick(showPassword);
  }, [showPassword]);

  const handleIconClick = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <InputAdornment position="end">
      <IconButton
        onClick={handleIconClick}
        edge="end"
        className=" text-default"
      >
        {showPassword ? (
          <VisibilityOffOutlinedIcon />
        ) : (
          <VisibilityOutlinedIcon />
        )}
      </IconButton>
    </InputAdornment>
  );
};
