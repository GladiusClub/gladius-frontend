import React from "react";
import classNames from "classnames";

import Typography from "components/Typography";

const days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];

const Date = ({ date, index, activeIndex, onDateClick }) => {
  return (
    <div
      className={classNames(
        "flex flex-col gap-2 justify-center items-center rounded-xl py-3 px-5",
        {
          "bg-gradient-active": index === activeIndex,
          "bg-dark": index !== activeIndex,
        }
      )}
      onClick={() => onDateClick(index)}
    >
      <Typography variant="span" className="text-xl">
        {date.getDate()}
      </Typography>
      <Typography variant="span" className="text-sm">
        {days[date.getDay()]}
      </Typography>
      <Typography
        variant="span"
        className="flex justify-center items-center text-sm text-dark bg-neutral w-6 h-6 rounded-full"
      >
        0
      </Typography>
    </div>
  );
};

export default Date;
