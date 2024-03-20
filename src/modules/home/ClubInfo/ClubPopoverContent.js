import React from "react";
import Box from "@mui/material/Box";

import Typography from "components/Typography";
import { PopoverClose, PopoverContent } from "components/Popover";
import useUserProfile from "context/userProfile/useUserProfile";
import { apiUrls } from "constants/urls";

const ClubPopoverContent = () => {
  const {
    user: { club },
  } = useUserProfile();

  return (
    <PopoverContent
      origin={{
        anchorOrigin: {
          vertical: "center",
          horizontal: "center",
        },
        transformOrigin: {
          vertical: "center",
          horizontal: "center",
        },
      }}
    >
      <Box className="p-8">
        <div className="flex justify-center items-center gap-3">
          <img
            src={club.src || `${apiUrls.uiAvatarApi}?name=${club.name}`}
            alt="sport-club"
            className="w-10 h-10 rounded-full"
          />
          <Typography className="text-xl">{club.name}</Typography>
        </div>
        <div className="text-sm">
          <Typography className="my-5">{club.description}</Typography>
          <Typography className="grid grid-cols-2 my-3">
            <Typography variant="span" className="text-primary">
              Tel:
            </Typography>
            <Typography variant="span">{club.tel || "NA"}</Typography>
          </Typography>
          <Typography className="grid grid-cols-2 my-3">
            <Typography variant="span" className="text-primary">
              Location:
            </Typography>
            <Typography variant="span">{club.tel || "NA"}</Typography>
          </Typography>
        </div>
        <div className="flex justify-end">
          <PopoverClose>
            <button className="text-secondary text-sm text-right">Close</button>
          </PopoverClose>
        </div>
      </Box>
    </PopoverContent>
  );
};

export default ClubPopoverContent;
