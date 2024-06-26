import React from "react";
import MuiPopover from "@mui/material/Popover";

import usePopover from "./usePopover";

const PopoverContent = ({ children, origin, ...rest }) => {
  const { anchorEl, setAnchorEl } = usePopover();

  return (
    <MuiPopover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      {...origin}
      {...rest}
    >
      {children}
    </MuiPopover>
  );
};

export default PopoverContent;
