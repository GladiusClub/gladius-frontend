import React from "react";

import { Popover } from "components/Popover";
import useUserProfile from "context/userProfile/useUserProfile";
import TransferPopoverTarget from "./TransferPopoverTarget";
import TransferPopoverContent from "./TransferPopoverContent";

const TransferInfo = ({ setPointsBalance }) => {
  const { user } = useUserProfile();

  if (!user.club) {
    return null;
  }

  return (
    <Popover>
      <TransferPopoverTarget />
      <TransferPopoverContent setPointsBalance={setPointsBalance} />
    </Popover>
  );
};

export default TransferInfo;
