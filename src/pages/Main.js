import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Loader from "../components/Loader";
import { protectedRoutes, unProtectedRoutes } from "../constants/routes";

const UnProtectedLayout = lazy(() => import("./unprotected/Layout"));
const ProtectedLayout = lazy(() => import("./protected/Layout"));
const Welcome = lazy(() => import("./unprotected/Welcome"));
const SignIn = lazy(() => import("./unprotected/SignIn"));
const SignUp = lazy(() => import("./unprotected/SignUp"));
const NotFound = lazy(() => import("./unprotected/NotFound"));
const Home = lazy(() => import("./protected/Home"));
const Calendar = lazy(() => import("./protected/Calendar"));
const Leaderboard = lazy(() => import("./protected/Leaderboard"));
const Profile = lazy(() => import("./protected/Profile"));
const Tasks = lazy(() => import("./protected/Tasks"));

const Main = () => {
  return (
    <Suspense
      fallback={<Loader className="flex justify-center items-center h-full" />}
    >
      <Routes>
        <Route element={<UnProtectedLayout />}>
          <Route path="*" element={<NotFound />} />
          <Route path={unProtectedRoutes.welcome} element={<Welcome />} />
          <Route path={unProtectedRoutes.signIn} element={<SignIn />} />
          <Route path={unProtectedRoutes.signUp} element={<SignUp />} />
        </Route>

        <Route path="/" element={<ProtectedLayout />}>
          <Route path={protectedRoutes.home} element={<Home />} />
          <Route path={protectedRoutes.calendar} element={<Calendar />} />
          <Route path={protectedRoutes.leaderboard} element={<Leaderboard />} />
          <Route path={protectedRoutes.profile} element={<Profile />} />
          <Route path={protectedRoutes.tasks} element={<Tasks />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Main;
