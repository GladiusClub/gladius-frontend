import { useContext } from "react";

import { UserProfileContext } from "context/userProfile/UserProfileContext";

const useUserProfile = () => {
  return useContext(UserProfileContext);
};

export default useUserProfile;
