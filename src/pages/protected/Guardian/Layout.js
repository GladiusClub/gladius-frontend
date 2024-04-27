/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, Suspense } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import Loader from "components/Loader";
import { apiUrls } from "constants/urls";
import Typography from "components/Typography";
import Menu from "modules/common/Menu";
import useUserProfile from "context/userProfile/useUserProfile";
import useFirebase from "services/firebase/useFirebase";
import useStudentsByGuardian from "hooks/useStudentsByGuardian";
import { generateUserInfo } from "modules/utils";
import { protectedRoutes, unProtectedRoutes } from "constants/routes";
import { collections } from "constants/collections";
import { localStorageKeys } from "constants/storage";
import { memberRoles, pageTitles } from "constants/common";

const Layout = () => {
  const { user, setUser } = useUserProfile();
  const location = useLocation();
  const { getDocDataById } = useFirebase();
  const { students, getStudentsDetailsFromGuardian } = useStudentsByGuardian();

  const fetchUserInfo = async () => {
    const info = {
      user,
    };

    const userData = await getDocDataById(
      collections.users,
      user.uid,
      localStorageKeys.user,
      setUser
    );

    if (userData) {
      info.user = userData;
      const students = await getStudentsDetailsFromGuardian();
      if (students) {
        info.students = students;
      }
    }

    const userInfo = generateUserInfo(info);
    setUser((prev) => ({ ...prev, ...userInfo }));
  };

  useEffect(() => {
    if (user.uid) {
      fetchUserInfo();
    }
  }, [user.uid]);

  if (user.isFetching) {
    return <Loader className="flex justify-center items-center h-full" />;
  }

  if (!user.uid) {
    return (
      <Navigate
        to={unProtectedRoutes.welcome}
        state={{ from: location }}
        replace
      />
    );
  }

  if (!students.loading && user.role !== memberRoles.parent) {
    return (
      <Navigate
        to={protectedRoutes.student.home}
        state={{ from: location }}
        replace
      />
    );
  }

  return (
    <>
      <div className="p-3">
        <div className="flex justify-between items-center">
          <img
            src={`${apiUrls.uiAvatarApi}?name=${user.name || user.email}`}
            alt={user.name}
            className="w-10 h-10 rounded-full"
          />

          <Typography className="text-center text-xl">
            {pageTitles[location.pathname]}
          </Typography>

          <Menu />
        </div>

        <Suspense
          fallback={
            <Loader className="flex justify-center items-center h-full mt-16" />
          }
        >
          {students.loading ? (
            <Loader className="mt-20 flex justify-center">
              <CircularProgress />
            </Loader>
          ) : (
            <Outlet />
          )}
        </Suspense>
      </div>
    </>
  );
};

export default Layout;
