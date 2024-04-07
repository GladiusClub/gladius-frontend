import React from "react";

import Typography from "components/Typography";
import { PopoverTarget } from "components/Popover";
import sendPointsIcon from "assets/send-points.svg";

const TransferPopoverTarget = () => {
  return (
    <PopoverTarget>
      <div className="flex justify-center items-center gap-3 mt-5">
        <div>
          <img src={sendPointsIcon} alt="Send" className="cursor-pointer" />
          <Typography className="text-sm text-center mt-3">Send</Typography>
        </div>
      </div>
    </PopoverTarget>
  );
};

export default TransferPopoverTarget;
