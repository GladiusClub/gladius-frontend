import React from "react";
import Button from "@mui/material/Button";

import gladiusLogo from "../../assets/gladius-logo.svg";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div>
      <img src={gladiusLogo} alt="Gladius" className="mt-20 mx-auto" />
      <section className="mt-10 text-center">
        <h1>Welcome!</h1>
        <p className="text-xl mt-5">
          Dive into the ultimate sports club. Earn crypto, collect NFTs, and
          train like never before!
        </p>
        <p className="text-xl mt-5">Join the excitement now!</p>

        <Link to="/signup">
          <Button size="large" variant="contained" className="w-full mt-5 bg-active">
            Sign Up
          </Button>
        </Link>
        <Link to="/signin">
          <Button
            size="large"
            variant="outlined"
            className="text-default border-primary w-full mt-5"
          >
            Sign In
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Welcome;
