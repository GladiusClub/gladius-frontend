import React from "react";

import PointsList from "./PointsList";
import PointsInfo from "./PointsInfo";
import PointsSendReceive from "./PointsSendReceive";
import { receivedData, sentData } from "./data";

const Points = () => {
  return (
    <div className="mt-10">
      <PointsInfo />
      <PointsSendReceive />
      <PointsList title="Received" list={receivedData} className="mt-10" />
      <PointsList title="Sent" list={sentData} className="mt-5" />
    </div>
  );
};

export default Points;