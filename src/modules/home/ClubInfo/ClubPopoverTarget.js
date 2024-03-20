import React from "react";

import Typography from "components/Typography";
import { PopoverTarget } from "components/Popover";
import useUserProfile from "context/userProfile/useUserProfile";
import { apiUrls } from "constants/urls";

const ClubPopoverTarget = () => {
  const { user } = useUserProfile();

  return (
    <PopoverTarget>
      <div className="flex justify-center items-center gap-3 mt-5">
        <img
          src={user.club.src || `${apiUrls.uiAvatarApi}?name=${user.club.name}`}
          alt="sport-club"
          className="w-10 h-10 rounded-full"
        />
        <Typography variant="span" className="text-lg">
          {user.club.name}
        </Typography>
      </div>
    </PopoverTarget>
  );
};

export default ClubPopoverTarget;
