import React from "react";
import MuiPopover from "@mui/material/Popover";

import usePopover from "./usePopover";

const PopoverContent = ({ children }) => {
  const { anchorEl, setAnchorEl } = usePopover();

  return (
    <MuiPopover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      {children}
    </MuiPopover>
  );
};

export default PopoverContent;
