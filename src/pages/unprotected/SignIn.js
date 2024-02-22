import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import OutlinedInput from "../../components/OutlinedInput";
import {
  UserAdornment,
  PasswordAdornment,
} from "../../components/OutlinedInput/Adornments";
import { unProtectedRoutes } from "../../constants/routes";
import gladiusLogo from "../../assets/gladius-logo.svg";

const SignIn = () => {
  const [values, setValues] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleBlur = (name, value) => {
    setValues(() => ({ ...values, [name]: value }));
  };

  const handleSignInClick = () => {
    console.log(values);
  };

  return (
    <div>
      <img src={gladiusLogo} alt="Gladius" className="mt-20 mx-auto" />
      <section className="mt-10 text-center">
        <h2 className="mb-16">Sign in to your account</h2>
        <OutlinedInput
          onBlur={handleBlur}
          field={{
            type: "text",
            name: "username",
            label: "Username",
          }}
          endAdornment={<UserAdornment />}
        />
        <OutlinedInput
          onBlur={handleBlur}
          field={{
            type: showPassword ? "text" : "password",
            name: "password",
            label: "Password",
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
        <p className="mt-5 text-lg">
          Don't have an account?
          <Link to={unProtectedRoutes.signUp} className="ml-2 text-primary">
            Sign up
          </Link>
        </p>
      </section>
    </div>
  );
};

export default SignIn;
