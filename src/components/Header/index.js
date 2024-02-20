import React from "react";
import { NavLink } from "react-router-dom";

import {protectedRoutes} from '../../constants/routes'
import "./header.css";

const links = [
  {
    to: protectedRoutes.home,
    text: "Home",
  },
  {
    to: protectedRoutes.calendar,
    text: "Calendar",
  },
  {
    to: protectedRoutes.tasks,
    text: "Tasks",
  },
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
    <nav className="nav flex justify-between bg-dark px-3 pt-8 pb-3 sticky top-0">
      {links.map(({to, text}) => (
        <NavLink
          key={text}
          to={to}
          className={({ isActive }) =>
            isActive ? "text-primary pointer-events-none" : ""
          }
        >
          {text}
        </NavLink>
      ))}
    </nav>
  );
};

export default Header;
