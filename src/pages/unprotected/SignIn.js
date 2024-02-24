import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import Typography from "components/Typography";
import OutlinedInput from "components/OutlinedInput";
import {
  UserAdornment,
  PasswordAdornment,
} from "components/OutlinedInput/Adornments";
import { useValidate } from "components/OutlinedInput/useValidate";
import { unProtectedRoutes } from "constants/routes";
import gladiusLogo from "assets/gladius-logo.svg";

const SignIn = () => {
  const [values, setValues] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { errors, validateOnBlur, validateOnSubmit } = useValidate(values);

  const handleBlur = (name, value) => {
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    validateOnBlur(name, newValues);
  };

  const handleSignInClick = () => {
    const isValid = validateOnSubmit(values);
    console.log(values);
    console.log(isValid);
  };

  return (
    <div>
      <img src={gladiusLogo} alt="Gladius" className="mx-auto" />
      <section className="text-center">
        <Typography variant="h2" className="mb-14">
          Sign in to your account
        </Typography>
        <OutlinedInput
          onBlur={handleBlur}
          field={{
            type: "text",
            name: "username",
            label: "Username",
            error: errors.username,
          }}
          endAdornment={<UserAdornment />}
        />
        <OutlinedInput
          onBlur={handleBlur}
          field={{
            type: showPassword ? "text" : "password",
            name: "password",
            label: "Password",
            error: errors.password,
          }}
          endAdornment={
            <PasswordAdornment onPasswordVisibilityClick={setShowPassword} />
          }
        />
        <Button
          size="large"
          variant="contained"
          className="w-full normal-case mt-5 bg-active"
          onClick={handleSignInClick}
        >
          Sign In
        </Button>
        <Typography className="mt-5 text-lg">
          Don't have an account?
          <Link to={unProtectedRoutes.signUp} className="ml-2 text-primary">
            Sign up
          </Link>
        </Typography>
      </section>
    </div>
  );
};

export default SignIn;
