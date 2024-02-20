import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Header from "../../components/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="p-3">
      <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default Layout;
