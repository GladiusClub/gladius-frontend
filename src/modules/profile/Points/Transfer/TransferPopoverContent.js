/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Box from "@mui/material/Box";

import { PopoverClose, PopoverContent } from "components/Popover";
import useUserProfile from "context/userProfile/useUserProfile";
import useClubMembers from "hooks/useClubMembers";
import TransferForm from "./TransferForm";

const TransferPopoverContent = () => {
  const { members, getClubMembers } = useClubMembers();
  const { user } = useUserProfile();

  useEffect(() => {
    if (user.club) {
      getClubMembers();
    }
  }, [user]);

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
        <TransferForm members={members.data} />

        {/* Close Button */}
        <div className="flex justify-end mt-4">
          <PopoverClose>
            <button className="text-secondary text-sm">Close</button>
          </PopoverClose>
        </div>
      </Box>
    </PopoverContent>
  );
};

export default TransferPopoverContent;
