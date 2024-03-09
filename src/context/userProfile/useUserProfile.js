import { useContext } from "react";

import { UserProfileContext } from "context/userProfile/UserProfileContext";

export const useUserProfile = () => {
  return useContext(UserProfileContext);
};
