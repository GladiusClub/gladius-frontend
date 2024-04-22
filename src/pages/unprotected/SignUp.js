import React from "react";
import { Link } from "react-router-dom";
import Fade from "@mui/material/Fade";

import Typography from "components/Typography";
import SignupForm from "modules/signup/SignupForm";
import { unProtectedRoutes } from "constants/routes";
import gladiusLogo from "assets/gladius-logo.svg";

const SignUp = () => {
  return (
    <Fade in={true}>
      <div className="text-center pb-5">
        <img src={gladiusLogo} alt="Gladius" className="mx-auto" />
        <Typography variant="h2" className="-mt-5">
          Create account
        </Typography>

        <SignupForm />

        <Typography className="mt-5 text-lg">
          Already have an account?
          <Link to={unProtectedRoutes.signIn} className="ml-2 text-primary">
            Sign in
          </Link>
        </Typography>
      </div>
    </Fade>
  );
};

export default SignUp;
