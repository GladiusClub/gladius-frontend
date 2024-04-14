import React from "react";

import Transfer from "./Transfer";
import Receive from "./Receive";

const PointsSendReceive = () => {
  return (
    <div className="flex justify-between items-center mt-5 w-1/2 mx-auto">
      <Transfer />
      <Receive />
    </div>
  );
};

export default PointsSendReceive;
