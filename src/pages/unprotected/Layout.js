import React from "react";
import { Outlet } from "react-router-dom";

const Unprotected = () => {
  return <Outlet />;
};

export default Unprotected;
