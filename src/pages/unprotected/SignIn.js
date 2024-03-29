import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";

import Typography from "components/Typography";
import OutlinedInput from "components/OutlinedInput";
import {
  EmailAdornment,
  PasswordAdornment,
} from "components/OutlinedInput/Adornments";
import useValidate from "components/OutlinedInput/useValidate";
import useFirebase from "services/firebase/useFirebase";
import { unProtectedRoutes } from "constants/routes";
import gladiusLogo from "assets/gladius-logo.svg";

const SignIn = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { errors, validateOnBlur, validateOnSubmit } = useValidate(values);
  const { firebaseError, loading, signInUser } = useFirebase();

  const handleBlur = (name, value) => {
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    validateOnBlur(name, newValues);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
    const isValid = validateOnSubmit(values);

    if (isValid) {
      signInUser(values.email, values.password);
    }
  };

  return (
    <Fade in={true}>
      <div className="text-center">
        <img src={gladiusLogo} alt="Gladius" className="mx-auto -mt-10" />
        <Typography variant="h2">Sign in to your account</Typography>
        <Typography
          className="text-secondary min-h-5 text-sm my-6"
          aria-live="assertive"
        >
          {firebaseError}
        </Typography>

        <form onSubmit={handleSubmit}>
          <OutlinedInput
            onBlur={handleBlur}
            field={{
              type: "text",
              name: "email",
              label: "Email",
              required: true,
              autoComplete: "email",
              error: errors.email,
            }}
            endAdornment={<EmailAdornment />}
          />
          <OutlinedInput
            onBlur={handleBlur}
            field={{
              type: showPassword ? "text" : "password",
              name: "password",
              label: "Password",
              required: true,
              autoComplete: "off",
              error: errors.password,
            }}
            endAdornment={
              <PasswordAdornment onPasswordVisibilityClick={setShowPassword} />
            }
          />

          <div className="text-right">
            <Link
              to={unProtectedRoutes.resetPassword}
              className="text-primary text-right"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            size="large"
            variant="contained"
            className="font-manrope w-full normal-case mt-5 bg-gradient-active"
            type="submit"
          >
            {loading ? "Loading..." : "Sign In"}
          </Button>
        </form>

        <Typography className="mt-5 text-lg">
          Don't have an account?
          <Link to={unProtectedRoutes.signUp} className="ml-2 text-primary">
            Sign up
          </Link>
        </Typography>
      </div>
    </Fade>
  );
};

export default SignIn;
