/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, Suspense } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";

import Header from "components/Header";
import Loader from "components/Loader";
import useUserProfile from "context/userProfile/useUserProfile";
import useFirebase from "services/firebase/useFirebase";
import { generateUserInfo } from "modules/utils";
import { unProtectedRoutes } from "constants/routes";
import { collections } from "constants/collections";
import { localStorageKeys } from "constants/storage";

const Layout = () => {
  const { user, setUser } = useUserProfile();
  const location = useLocation();
  const { getDocDataByUid } = useFirebase();

  const fetchUserInfo = async () => {
    const info = {
      user,
      club: null,
    };

    const userData = await getDocDataByUid(
      collections.users,
      user.uid,
      localStorageKeys.user,
      setUser
    );

    if (userData) {
      info.user = userData;

      if (userData?.clubs_roles?.length) {
        const clubData =
          (await getDocDataByUid(
            collections.clubs,
            userData.clubs_roles[0].club_id
          )) || {};

        if (clubData) {
          info.club = clubData;
        }
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

  return (
    <>
      <Header />
      <div className="p-3">
        <Suspense fallback={<Loader className='flex justify-center items-center h-full'/>}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default Layout;
