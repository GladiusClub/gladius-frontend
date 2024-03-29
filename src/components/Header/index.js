import React from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

import Divider from "components/Divider";
import { protectedRoutes } from "constants/routes";

const links = [
  {
    to: protectedRoutes.home,
    text: "Home",
  },
  {
    to: protectedRoutes.calendar,
    text: "Calendar",
  },
  // {
  //   to: protectedRoutes.tasks,
  //   text: "Tasks",
  // },
  {
    to: protectedRoutes.leaderboard,
    text: "Leaderboard",
  },
  {
    to: protectedRoutes.profile,
    text: "Profile",
  },
];

const Header = () => {
  return (
    <div className="sticky top-0 z-10">
      <nav className="flex justify-between bg-dark px-3 pt-8 pb-3">
        {links.map(({ to, text }) => (
          <NavLink
            key={text}
            to={to}
            className={({ isActive }) =>
              classNames({ "text-primary pointer-events-none": isActive })
            }
          >
            {text}
          </NavLink>
        ))}
      </nav>
      <Divider />
    </div>
  );
};

export default Header;
