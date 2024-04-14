import React from "react";

import { Popover } from "components/Popover";
import ReceivePopoverTarget from "./ReceivePopoverTarget";
import ReceivePopovercontent from "./ReceivePopovercontent";

const Receive = () => {
  return (
    <Popover>
      <ReceivePopoverTarget />
      <ReceivePopovercontent />
    </Popover>
  );
};

export default Receive;

