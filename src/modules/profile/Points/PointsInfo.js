import React, { useMemo } from "react";
import dayjs from "dayjs";
import { IoMdArrowDropup } from "react-icons/io";

import Typography from "components/Typography";

const PointsInfo = ({ eventsList }) => {
  const pointsBalance = useMemo(() => {
    return eventsList.reduce((acc, curr) => acc + curr.score, 0);
  }, [eventsList]);

  const { pointsInWeek, percentInWeek } = useMemo(() => {
    if (pointsBalance === 0) {
      return {
        pointsInWeek: 0,
        percentInWeek: 0,
      };
    }

    const today = dayjs();
    const lastWeekDate = today.subtract(1, "week");
    const firstDateOfLastWeek = lastWeekDate.startOf("week");
    const firstDateOfCurrWeek = today.startOf("week");
    let pointsInWeek = 0;

    for (let event of eventsList) {
      if (dayjs(event.date).isBefore(firstDateOfLastWeek)) {
        break;
      }
      if (dayjs(event.date).isBefore(firstDateOfCurrWeek)) {
        pointsInWeek += event.score;
      }
    }

    return {
      pointsInWeek,
      percentInWeek: ((pointsInWeek / pointsBalance) * 100)
        .toFixed(1)
        .replace(/\.0+$/, ""),
    };
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
