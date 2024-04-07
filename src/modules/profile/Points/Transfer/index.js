import React from "react";

import { Popover } from "components/Popover";
import useUserProfile from "context/userProfile/useUserProfile";
import TransferPopoverTarget from "./TransferPopoverTarget";
import TransferPopoverContent from "./TransferPopoverContent";

const TransferInfo = () => {
  const { user } = useUserProfile();

  if (!user.club) {
    return null;
  }

  return (
    <Popover>
      <TransferPopoverTarget />
      <TransferPopoverContent />
    </Popover>
  );
};

export default TransferInfo;
