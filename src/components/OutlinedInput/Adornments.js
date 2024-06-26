import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { AiOutlineUser } from "react-icons/ai";
import { TbBrandGuardian } from "react-icons/tb";
import { BiEuro } from "react-icons/bi";
import { PiStudent } from "react-icons/pi";
import {
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdOutlineMail,
} from "react-icons/md";

export const UserAdornment = () => {
  return (
    <InputAdornment position="end">
      <IconButton edge="end" className=" text-default">
        <AiOutlineUser />
      </IconButton>
    </InputAdornment>
  );
};

export const EmailAdornment = () => {
  return (
    <InputAdornment position="end">
      <IconButton edge="end" className=" text-default">
        <MdOutlineMail />
      </IconButton>
    </InputAdornment>
  );
};

export const PasswordAdornment = ({ onPasswordVisibilityClick }) => {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    onPasswordVisibilityClick(showPassword);
  }, [showPassword, onPasswordVisibilityClick]);

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
        {showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
      </IconButton>
    </InputAdornment>
  );
};

export const AmountAdornment = () => {
  return (
    <InputAdornment position="end">
      <IconButton edge="end" className=" text-default">
        <BiEuro />
      </IconButton>
    </InputAdornment>
  );
};

export const GuardianAdornment = ()=>{
  return (
    <InputAdornment position="end">
      <IconButton edge="end" className=" text-default">
        <TbBrandGuardian />
      </IconButton>
    </InputAdornment>
  );
}

export const StudentAdornment = ()=>{
  return (
    <InputAdornment position="end">
      <IconButton edge="end" className=" text-default">
        <PiStudent />
      </IconButton>
    </InputAdornment>
  );
}