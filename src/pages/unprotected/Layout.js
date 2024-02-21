import React from "react";
import { Outlet } from "react-router-dom";

const Unprotected = () => {
  return (
    <div className="p-3">
      <Outlet />
    </div>
  );
};

export default Unprotected;
