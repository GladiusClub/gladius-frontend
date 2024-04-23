import { protectedRoutes } from "./routes";

export const pageTitles = {
  [protectedRoutes.student.home]: "Dashboard",
  [protectedRoutes.student.calendar]: "Event",
  [protectedRoutes.student.tasks]: "Tasks",
  [protectedRoutes.student.leaderboard]: "Leaderboard",
  [protectedRoutes.student.profile]: "Wallet",
  [protectedRoutes.guardian.home]: "Subscription Detail",
};

export const memberRoles = {
  parent: "parent",
};
