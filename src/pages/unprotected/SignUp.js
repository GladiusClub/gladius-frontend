import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { signOut } from "firebase/auth";

import Typography from "components/Typography";
import OutlinedInput from "components/OutlinedInput";
import {
  UserAdornment,
  EmailAdornment,
  PasswordAdornment,
} from "components/OutlinedInput/Adornments";
import { useValidate } from "components/OutlinedInput/useValidate";
import { auth } from "services/firebase-config";
import { useFirebase } from "services/useFirebase";
import { unProtectedRoutes } from "constants/routes";
import gladiusLogo from "assets/gladius-logo.svg";

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
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

  const handleSignUpClick = async () => {
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
    <div>
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
            type: "text",
            name: "username",
            label: "Username",
            required: true,
            autoComplete: "username",
            error: errors.username,
          }}
          endAdornment={<UserAdornment />}
        />
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
            error: errors.confirmPassword,
          }}
          endAdornment={
            <PasswordAdornment
              onPasswordVisibilityClick={setShowConfirmPassword}
            />
          }
        />
        <Button
          size="large"
          variant="contained"
          className="w-full normal-case mt-5 bg-gradient-active"
          onClick={handleSignUpClick}
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
    </div>
  );
};

export default SignUp;
