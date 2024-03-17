import React from "react";
import classNames from "classnames";

import Typography from "components/Typography";
import useEventsByDate from "context/EventsByDate/useEventsByDate";
import EventsCount from "./EventsCount";

const days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];

const Date = ({ date, index }) => {
  const { activeIndex, eventsCount, setActiveIndex } = useEventsByDate();

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
      <EventsCount
        count={eventsCount}
        dateString={date.toDateString()}
        isActive={index === activeIndex}
      />
    </div>
  );
};

export default Date;
