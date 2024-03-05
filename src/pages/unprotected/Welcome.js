import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import gladiusLogo from "assets/gladius-logo.svg";
import Typography from "components/Typography";

const Welcome = () => {
  return (
    <div>
      <img src={gladiusLogo} alt="Gladius" className="mt-10 mx-auto" />
      <section className="mt-5 text-center">
        <Typography variant="h1">Welcome!</Typography>
        <Typography className="text-xl mt-5">
          Dive into the ultimate sports club. Earn crypto, collect NFTs, and
          train like never before!
        </Typography>
        <Typography className="text-xl mt-5">
          Join the excitement now!
        </Typography>

        <Link to="/signup">
          <Button
            size="large"
            variant="contained"
            className="w-full normal-case mt-5 bg-gradient-active"
          >
            Sign Up
          </Button>
        </Link>
        <Link to="/signin">
          <Button
            size="large"
            variant="outlined"
            className="text-default normal-case border-primary w-full mt-5"
          >
            Sign In
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Welcome;
