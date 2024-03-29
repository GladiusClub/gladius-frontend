/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

import Loader from "components/Loader";
import Typography from "components/Typography";
import useEventsByDate from "hooks/useEventsByDate";
import useEventsWithRsvp from "hooks/useEventsWithRsvp";
import useDatesSelection from "../context/DatesSelection/useDatesSelection";
import EventsList from "modules/common/Events/EventsList";

const GroupEvents = () => {
  const { datesToSlide, activeIndex, datesOfWeek } = useDatesSelection();
  const { eventsByDate } = useEventsByDate(
    activeIndex > -1 ? datesToSlide[activeIndex] : datesOfWeek
  ); // From calendar Api
  const { eventsWithRsvp } = useEventsWithRsvp(eventsByDate.data); // From rsvp collection

  if (eventsByDate.loading) {
    return (
      <div className="mt-10 h-full flex justify-center item-center">
        <Loader>
          <CircularProgress className="w-20 h-20" />
        </Loader>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <Typography className="text-primary text-xl">
        My Group Events ({eventsByDate.data.length})
      </Typography>
      <EventsList list={eventsWithRsvp.data} />
    </div>
  );
};

export default GroupEvents;
