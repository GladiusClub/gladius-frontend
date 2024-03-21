import React from "react";

import { Popover } from "components/Popover";
import useUserProfile from "context/userProfile/useUserProfile";
import ClubPopoverTarget from "./ClubPopoverTarget";
import ClubPopoverContent from "./ClubPopoverContent";

const ClubInfo = () => {
  const { user } = useUserProfile();

  if (!user.club) {
    return null;
  }

  return (
    <Popover>
      <ClubPopoverTarget />
      <ClubPopoverContent />
    </Popover>
  );
};

export default ClubInfo;
