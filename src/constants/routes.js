export const protectedRoutes = {
  student: {
    home: "/student/home",
    calendar: "/student/calendar",
    tasks: "/student/tasks",
    leaderboard: "/student/leaderboard",
    profile: "/student/profile",
  },
  guardian: {
    home: "/guardian/home",
  },
};

export const unProtectedRoutes = {
  signIn: "/signin",
  signUp: "/signup",
  welcome: "/welcome",
  resetPassword: "/reset-password",
  enroll: "/enroll",
};
