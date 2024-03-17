import React, { useEffect, useState } from "react";
import classNames from "classnames";

import Typography from "components/Typography";
import useEventsByDate from "context/EventsByDate/useEventsByDate";

const EventsCount = ({ dateString, isActive }) => {
  const { eventsCount, loading } = useEventsByDate();
  const [eventsCountCache, setEventsCountCache] = useState({});

  useEffect(() => {
    if (isActive) {
      setEventsCountCache((prev) => {
        prev[dateString] = loading ? 0 : eventsCount;
        return { ...prev };
      });
    }
  }, [isActive, dateString, eventsCount, loading]);

  return (
    <Typography
      variant="span"
      className={classNames(
        "flex justify-center items-center text-sm text-dark w-6 h-6 rounded-full",
        {
          "bg-neutral": !eventsCountCache[dateString],
          "bg-white": eventsCountCache[dateString],
        }
      )}
    >
      {eventsCountCache[dateString] || 0}
    </Typography>
  );
};

export default EventsCount;
