import React, { useState, useEffect } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import GlcBalanceFetcher from "api/glcBalance";

import Typography from "components/Typography";
//import { getPointsAndPercentInWeek } from "modules/utils";

const PointsInfo = ({ eventsList }) => {
  const [pointsBalance, setPointsBalance] = useState(0);

  //const pointsBalance = useMemo(() => {
  //return eventsList.reduce((acc, curr) => acc + curr.score, 0);
  //}, [eventsList]);

  //const { pointsInWeek, percentInWeek } = useMemo(() => {
  //return getPointsAndPercentInWeek(pointsBalance, eventsList);
  //}, [eventsList, pointsBalance]);

  useEffect(() => {
    GlcBalanceFetcher()
      .then((response) => {
        // Assuming the response contains the points balance
        setPointsBalance(response.balance != null ? response.balance : 0);
        console.log(pointsBalance);
      })
      .catch((error) => {
        console.error("Error fetching GLC balance:", error);
      });
  }, [pointsBalance]);

  return (
    <div className="flex items-center flex-col">
      <Typography className="text-lg">GLC balance</Typography>
      <Typography className="text-4xl text-secondary mt-1">
        {pointsBalance}
      </Typography>
      <Typography className="flex text-success items-center">
        <IoMdArrowDropup className="w-7 h-7" />
        <Typography variant="span" className="text-sm ">
          {pointsBalance} points last week (+{pointsBalance}%)
        </Typography>
      </Typography>
    </div>
  );
};

export default PointsInfo;
