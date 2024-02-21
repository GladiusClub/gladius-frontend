import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Header from "../../components/Header";
import Loader from "../../components/Loader";

const Layout = () => {
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
