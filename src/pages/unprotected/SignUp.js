import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import { signOut } from "firebase/auth";

import Typography from "components/Typography";
import OutlinedInput from "components/OutlinedInput";
import {
  EmailAdornment,
  PasswordAdornment,
} from "components/OutlinedInput/Adornments";
import useValidate from "components/OutlinedInput/useValidate";
import { auth } from "services/firebase/firebase-config";
import useFirebase from "services/firebase/useFirebase";
import { unProtectedRoutes } from "constants/routes";
import gladiusLogo from "assets/gladius-logo.svg";

const SignUp = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { errors, validateOnBlur, validateOnSubmit } = useValidate(values);
  const { firebaseError, loading, signUpUser } = useFirebase();

  const navigate = useNavigate();

  const handleBlur = (name, value) => {
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    validateOnBlur(name, newValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
    const isValid = validateOnSubmit(values);

    if (isValid) {
      const response = await signUpUser(values.email, values.password);
      if (response?.user) {
        await signOut(auth);
        navigate(unProtectedRoutes.signIn, {
          replace: true,
        });
      }
    }
  };

  return (
    <Fade in={true}>
      <form onSubmit={handleSubmit}>
        <img src={gladiusLogo} alt="Gladius" className="mx-auto -mt-10" />
        <section className="text-center -mt-5">
          <Typography variant="h2">Create account</Typography>
          <Typography
            className="text-secondary min-h-5 text-sm my-5"
            aria-live="assertive"
          >
            {firebaseError}
          </Typography>
          <OutlinedInput
            onBlur={handleBlur}
            field={{
              type: "email",
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
          <OutlinedInput
            onBlur={handleBlur}
            field={{
              type: showConfirmPassword ? "text" : "password",
              name: "confirmPassword",
              label: "Confirm Password",
              required: true,
              autoComplete: "off",
              error: errors.confirmPassword,
            }}
            endAdornment={
              <PasswordAdornment
                onPasswordVisibilityClick={setShowConfirmPassword}
              />
            }
          />
          <Button
            type="submit"
            size="large"
            variant="contained"
            className="font-manrope w-full normal-case mt-5 bg-gradient-active"
          >
            {loading ? "Loading..." : "Sign Up"}
          </Button>
          <Typography className="mt-5 text-lg">
            Already have an account?
            <Link to={unProtectedRoutes.signIn} className="ml-2 text-primary">
              Sign in
            </Link>
          </Typography>
        </section>
      </form>
    </Fade>
  );
};

export default SignUp;
