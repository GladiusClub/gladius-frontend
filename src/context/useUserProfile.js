import { useContext } from "react";

import { UserProfileContext } from "context/UserProfileContext";

export const useUserProfile = () => {
  return useContext(UserProfileContext);
};
