import React, { useMemo } from "react";

import Typography from "components/Typography";
import Events from "modules/common/Events";
import useEventsByDate from "context/EventsByDate/useEventsByDate";

const GroupEvents = () => {
  const { datesToSlide, activeIndex, eventsCount, setEventsCount, setLoading } =
    useEventsByDate();

  const dates = useMemo(
    () => ({
      minDate: datesToSlide[activeIndex],
      maxDate: datesToSlide[activeIndex],
    }),
    [activeIndex, datesToSlide]
  );

  return (
    <div className="mt-10">
      <Typography className="text-primary text-xl">
        My Group Events ({eventsCount})
      </Typography>
      <Events
        dates={dates}
        onDataLoaded={setEventsCount}
        onLoading={setLoading}
      />
    </div>
  );
};

export default GroupEvents;
