import React from "react";

import { Popover } from "components/Popover";
import TransferPopoverTarget from "./TransferPopoverTarget";
import TransferPopoverContent from "./TransferPopoverContent";

const Transfer = () => {
  return (
    <Popover>
      <TransferPopoverTarget />
      <TransferPopoverContent />
    </Popover>
  );
};

export default Transfer;
