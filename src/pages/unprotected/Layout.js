import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";

import Loader from "components/Loader";
import useUserProfile from "context/userProfile/useUserProfile";
import { protectedRoutes, unProtectedRoutes } from "constants/routes";

const Unprotected = () => {
  const { user } = useUserProfile();
  const location = useLocation();
  const from = location.state?.from?.pathname || protectedRoutes.student.home;

  if (user.isFetching) {
    return <Loader className="flex justify-center items-center h-full" />;
  }

  if (
    user.uid &&
    location.pathname !== unProtectedRoutes.signUp &&
    location.pathname !== unProtectedRoutes.enroll
  ) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="p-3 h-full flex flex-col justify-center ">
      <Outlet />
    </div>
  );
};

export default Unprotected;
