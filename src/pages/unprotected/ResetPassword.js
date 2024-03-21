import React, { useState } from "react";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import Typography from "components/Typography";
import OutlinedInput from "components/OutlinedInput";
import { EmailAdornment } from "components/OutlinedInput/Adornments";
import useValidate from "components/OutlinedInput/useValidate";
import useFirebase from "services/firebase/useFirebase";
import gladiusLogo from "assets/gladius-logo.svg";
import { unProtectedRoutes } from "constants/routes";

const ResetPassword = () => {
  const [values, setValues] = useState({ email: "" });
  const [isSuccess, setSuccess] = useState(false);
  const { errors, validateOnBlur, validateOnSubmit } = useValidate(values);
  const { firebaseError, loading, resetPassword } = useFirebase();

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
      const hasMailSent = await resetPassword(values.email);
      if (hasMailSent) {
        setSuccess(true);
      }
    }
  };

  if (isSuccess) {
    return (
      <Fade in={true}>
        <div className="text-center">
          <img src={gladiusLogo} alt="Gladius" className="mx-auto -mt-28" />
          <Typography>We have sent you a mail to reset password!</Typography>
          <Typography className="mt-5">
            Click here to{" "}
            <Link to={unProtectedRoutes.signIn} className="text-primary">
              Sign in
            </Link>
          </Typography>
        </div>
      </Fade>
    );
  }

  return (
    <Fade in={true}>
      <div className="text-center">
        <img src={gladiusLogo} alt="Gladius" className="mx-auto -mt-28" />
        <Typography variant="h2" className="text-center">
          Reset password
        </Typography>
        <form onSubmit={handleSubmit}>
          <Typography
            className="text-secondary min-h-5 text-sm my-6"
            aria-live="assertive"
          >
            {firebaseError}
          </Typography>
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
          <Button
            size="large"
            variant="contained"
            className="font-manrope w-full normal-case mt-1 bg-gradient-active"
            type="submit"
          >
            {loading ? "Loading..." : "Send password reset link"}
          </Button>
        </form>

        <Typography className="mt-5 text-lg">
          Go back to
          <Link to={unProtectedRoutes.signIn} className="ml-2 text-primary">
            Sign in
          </Link>
        </Typography>
      </div>
    </Fade>
  );
};

export default ResetPassword;
