import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { signInWithEmailAndPassword } from "firebase/auth";

import Typography from "components/Typography";
import OutlinedInput from "components/OutlinedInput";
import {
  EmailAdornment,
  PasswordAdornment,
} from "components/OutlinedInput/Adornments";
import { useValidate } from "components/OutlinedInput/useValidate";
import { auth } from "services/firebase-config";
import { unProtectedRoutes } from "constants/routes";
import { authMessages } from "constants/auth";
import gladiusLogo from "assets/gladius-logo.svg";

const SignIn = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { errors, validateOnBlur, validateOnSubmit } = useValidate(values);
  const firebaseErrorRef = useRef(null);

  const handleBlur = (name, value) => {
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    validateOnBlur(name, newValues);
  };

  const handleSignInClick = async () => {
    const isValid = validateOnSubmit(values);
    if (isValid) {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        firebaseErrorRef.current.textContent = "";
      } catch (err) {
        firebaseErrorRef.current.textContent =
          authMessages[err.code] || err.message;
      }
    }
  };

  return (
    <div>
      <img src={gladiusLogo} alt="Gladius" className="mx-auto" />
      <section className="text-center">
        <Typography variant="h2">Sign in to your account</Typography>
        <p
          ref={firebaseErrorRef}
          className="text-secondary min-h-5 text-sm my-6"
          aria-live="assertive"
        />
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
