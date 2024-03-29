import React from "react";
import classNames from "classnames";

import Typography from "components/Typography";
import useEventsByDate from "hooks/useEventsByDate";
import useDatesSelection from "../context/DatesSelection/useDatesSelection";

const days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];

const Date = ({ date, index }) => {
  const { eventsByDate } = useEventsByDate([date]);
  const { activeIndex, setActiveIndex } = useDatesSelection();

  return (
    <div
      className={classNames(
        "flex flex-col gap-2 justify-center items-center rounded-xl py-3 px-5",
        {
          "bg-gradient-active": index === activeIndex,
          "bg-dark": index !== activeIndex,
        }
      )}
      onClick={() => setActiveIndex(index)}
    >
      <Typography variant="span" className="text-xl">
        {date.getDate()}
      </Typography>
      <Typography variant="span" className="text-sm">
        {days[date.getDay()]}
      </Typography>
      <Typography
        variant="span"
        className={classNames(
          "flex justify-center items-center text-sm text-dark w-6 h-6 rounded-full",
          {
            "bg-neutral": !eventsByDate.data.length,
            "bg-white": eventsByDate.data.length,
          }
        )}
      >
        {eventsByDate.data.length}
      </Typography>
    </div>
  );
};

export default Date;
