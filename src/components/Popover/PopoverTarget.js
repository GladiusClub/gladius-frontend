import { cloneElement } from "react";

import usePopover from "./usePopover";

const PopoverTarget = ({ children }) => {
  const { setAnchorEl } = usePopover();

  return cloneElement(children, {
    onClick: (event) => setAnchorEl(event.currentTarget),
  });
};

export default PopoverTarget;
