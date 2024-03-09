import React, { Suspense } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";

import Header from "components/Header";
import Loader from "components/Loader";
import { useUserProfile } from "context/userProfile/useUserProfile";
import { unProtectedRoutes } from "constants/routes";

const Layout = () => {
  const { user } = useUserProfile();
  const location = useLocation();

  if (user.isFetching) {
    return <Loader className="flex justify-center items-center h-full" />;
  }

  if (!user.email) {
    return (
      <Navigate
        to={unProtectedRoutes.welcome}
        state={{ from: location }}
        replace
      />
    );
  }

  return (
    <>
      <Header />
      <div className="p-3">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default Layout;
