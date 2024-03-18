import React, { useMemo } from "react";
import { IoMdArrowDropup } from "react-icons/io";

import Typography from "components/Typography";
import { getPointsAndPercentInWeek } from "modules/utils";

const PointsInfo = ({ eventsList }) => {
  const pointsBalance = useMemo(() => {
    return eventsList.reduce((acc, curr) => acc + curr.score, 0);
  }, [eventsList]);

  const { pointsInWeek, percentInWeek } = useMemo(() => {
    return getPointsAndPercentInWeek(pointsBalance, eventsList);
  }, [eventsList, pointsBalance]);

  return (
    <div className="flex items-center flex-col">
      <Typography className="text-lg">Points balance</Typography>
      <Typography className="text-4xl text-secondary mt-1">
        {pointsBalance.toLocaleString()}
      </Typography>
      <Typography className="flex text-success items-center">
        <IoMdArrowDropup className="w-7 h-7" />
        <Typography variant="span" className="text-sm ">
          {pointsInWeek} points last week (+{percentInWeek}%)
        </Typography>
      </Typography>
    </div>
  );
};

export default PointsInfo;
