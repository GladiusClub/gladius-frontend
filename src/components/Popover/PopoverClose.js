import { cloneElement } from "react";

import usePopover from "./usePopover";

const PopoverClose = ({ children }) => {
  const { setAnchorEl } = usePopover();

  return cloneElement(children, {
    onClick: () => setAnchorEl(null),
  });
};

export default PopoverClose;
