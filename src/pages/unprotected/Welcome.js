import React from "react";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
import Fade from "@mui/material/Fade";

import Typography from "components/Typography";
import { unProtectedRoutes } from "constants/routes";
import gladiusLogo from "assets/gladius-logo.svg";

const Welcome = () => {
  const location = useLocation();
  return (
    <Fade in={true}>
      <div>
        <img src={gladiusLogo} alt="Gladius" className="mx-auto -mt-10" />
        <section className="mt-5 text-center">
          <Typography variant="h1">Welcome!</Typography>
          <Typography className="text-xl mt-5">
            Dive into the ultimate sports club. Earn crypto, collect NFTs, and
            train like never before!
          </Typography>
          <Typography className="text-xl mt-5">
            Join the excitement now!
          </Typography>

          <Link to={unProtectedRoutes.signUp}>
            <Button
              size="large"
              variant="contained"
              className="font-manrope w-full normal-case mt-10 bg-gradient-active"
            >
              Sign Up
            </Button>
          </Link>
          <Link to={unProtectedRoutes.signIn} state={location.state}>
            <Button
              size="large"
              variant="outlined"
              className="font-manrope text-default normal-case border-primary w-full mt-5"
            >
              Sign In
            </Button>
          </Link>
        </section>
      </div>
    </Fade>
  );
};

export default Welcome;
