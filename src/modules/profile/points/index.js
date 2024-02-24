import React from "react";

import PointsInfo from "./PointsInfo";
import PointsSendReceive from "./PointsSendReceive";

const Points = () => {
  return (
    <div className="mt-10">
      <PointsInfo />
      <PointsSendReceive />
    </div>
  );
};

export default Points;
