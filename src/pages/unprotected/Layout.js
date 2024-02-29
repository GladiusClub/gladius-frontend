import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";

import Loader from "components/Loader";
import { useUserProfile } from "context/useUserProfile";
import { protectedRoutes } from "constants/routes";

const Unprotected = () => {
  const { user } = useUserProfile();
  const location = useLocation();
  const from = location.state?.from?.pathname || protectedRoutes.home;

  if (user.isFetching) {
    return <Loader className="flex justify-center items-center h-full" />;
  }

  if (user.email) {
    return <Navigate to={from} replace />;
  }
  return (
    <div className="p-3">
      <Outlet />
    </div>
  );
};

export default Unprotected;
