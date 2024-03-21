import { createContext, useState } from "react";

export const PopoverContext = createContext({});

export const PopoverProvider = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <PopoverContext.Provider value={{ anchorEl, setAnchorEl }}>
      {children}
    </PopoverContext.Provider>
  );
};
