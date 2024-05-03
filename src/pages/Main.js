import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Loader from "components/Loader";
import { params, protectedRoutes, unProtectedRoutes } from "constants/routes";

const UnProtectedLayout = lazy(() => import("./unprotected/Layout"));
const StudentProtectedLayout = lazy(() => import("./protected/Student/Layout"));
const GuardianProtectedLayout = lazy(
  () => import("./protected/Guardian/Layout")
);
const Welcome = lazy(() => import("./unprotected/Welcome"));
const SignIn = lazy(() => import("./unprotected/SignIn"));
const SignUp = lazy(() => import("./unprotected/SignUp"));
const ResetPassword = lazy(() => import("./unprotected/ResetPassword"));
const Enroll = lazy(() => import("./unprotected/Enroll"));
const StudentHome = lazy(() => import("./protected/Student/Home"));
const Calendar = lazy(() => import("./protected/Student/Calendar"));
const Leaderboard = lazy(() => import("./protected/Student/Leaderboard"));
const Profile = lazy(() => import("./protected/Student/Profile"));
const Tasks = lazy(() => import("./protected/Student/Tasks"));
const GuardianHome = lazy(() => import("./protected/Guardian/Home"));
const GuardianCalendar = lazy(() => import("./protected/Guardian/Calendar"));
const NotFound = lazy(() => import("./NotFound"));

const Main = () => {
  return (
    <Suspense
      fallback={<Loader className="flex justify-center items-center h-full" />}
    >
      <Routes>
        <Route element={<UnProtectedLayout />}>
          <Route path={unProtectedRoutes.welcome} element={<Welcome />} />
          <Route path={unProtectedRoutes.signIn} element={<SignIn />} />
          <Route path={unProtectedRoutes.signUp} element={<SignUp />} />
          <Route path={unProtectedRoutes.enroll} element={<Enroll />} />
          <Route
            path={unProtectedRoutes.resetPassword}
            element={<ResetPassword />}
          />
        </Route>

        {/* Student */}
        <Route element={<StudentProtectedLayout />}>
          <Route
            path={protectedRoutes.student.home}
            element={<StudentHome />}
          />
          <Route
            path={protectedRoutes.student.calendar}
            element={<Calendar />}
          />
          <Route
            path={protectedRoutes.student.leaderboard}
            element={<Leaderboard />}
          />
          <Route path={protectedRoutes.student.profile} element={<Profile />} />
          <Route path={protectedRoutes.student.tasks} element={<Tasks />} />
        </Route>

        {/* Guardian */}
        <Route element={<GuardianProtectedLayout />}>
          <Route
            path={protectedRoutes.guardian.home}
            element={<GuardianHome />}
          />
          <Route
            path={protectedRoutes.guardian.calendar}
            element={<GuardianCalendar />}
          />
          <Route
            path={`${protectedRoutes.guardian.calendar}/:${params.studentUid}`}
            element={<GuardianCalendar />}
          />
        </Route>

        <Route
          path="/"
          element={<Navigate to={protectedRoutes.student.home} replace />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Main;
