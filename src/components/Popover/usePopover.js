import { useContext } from "react";

import { PopoverContext } from "./PopoverContext";

const usePopover = () => {
  return useContext(PopoverContext);
};

export default usePopover;
