import React from "react";

import Typography from "components/Typography";
import { PopoverTarget } from "components/Popover";
import receivePointsIcon from "assets/receive-points.svg";

const ReceivePopoverTarget = () => {
  return (
    <PopoverTarget>
      <div>
        <img src={receivePointsIcon} alt="Receive" className="cursor-pointer" />
        <Typography className="text-sm text-center mt-3">Receive</Typography>
      </div>
    </PopoverTarget>
  );
};

export default ReceivePopoverTarget;
