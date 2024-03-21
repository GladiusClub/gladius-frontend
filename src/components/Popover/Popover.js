import React from "react";

import { PopoverProvider } from "./PopoverContext";

const Popover = ({ children }) => {
  return (
    <PopoverProvider>
      {children}
    </PopoverProvider>
  );
};

export default Popover;
