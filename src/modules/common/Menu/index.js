import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import MenuItem from "@mui/material/MenuItem";
import { signOut } from "firebase/auth";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTarget,
} from "components/Popover";
import { auth } from "services/firebase/firebase-config";
import { externalUrls } from "constants/urls";
import "./menu.css";

const Menu = () => {
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <Popover>
      <PopoverTarget>
        <GiHamburgerMenu className="text-3xl" />
      </PopoverTarget>
      <PopoverContent
        origin={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        }}
        className="menu"
      >
        <PopoverClose>
          <ul>
            <MenuItem>
              <a
                href={externalUrls.gladiusDocs}
                target="_blank"
                rel="noreferrer"
              >
                Docs
              </a>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </ul>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};

export default Menu;
