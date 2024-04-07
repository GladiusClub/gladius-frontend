import React from "react";

import Typography from "components/Typography";
import sendPointsIcon from "assets/send-points.svg";
import receivePointsIcon from "assets/receive-points.svg";
import TransferInfo from "./Transfer";

const PointsSendReceive = () => {
  return (
    <div className="flex justify-between items-center mt-5 w-1/2 mx-auto">
      <div>
        <TransferInfo></TransferInfo>
      </div>

      <div>
        <img src={receivePointsIcon} alt="Receive" className="cursor-pointer" />
        <Typography className="text-sm text-center mt-3">Receive</Typography>
      </div>
    </div>
  );
};

export default PointsSendReceive;
