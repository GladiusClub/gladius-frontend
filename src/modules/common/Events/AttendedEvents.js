/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import NoData from "components/NoData";
import useUserProfile from "context/userProfile/useUserProfile";
import useAttendedEvents from "hooks/useAttendedEvents";
import EventsList from "./EventsList";

const Events = memo(({ dates, onDataLoaded }) => {
  const { user } = useUserProfile();
  const { attendedEvents, getAttendedEvents } = useAttendedEvents();

  useEffect(() => {
    if (user.club) {
      getAttendedEvents(dates);
    }
  }, [user.club, dates]);

  useEffect(() => {
    onDataLoaded(attendedEvents.data.length);
  }, [attendedEvents.data]);

  if (attendedEvents.loading) {
    return (
      <div className="mt-10 h-full flex justify-center item-center">
        <CircularProgress />
      </div>
    );
  }

  if (attendedEvents.error) {
    return (
      <div className="mt-10 text-secondary text-lg text-center">
        Failed to load!
      </div>
    );
  }

  if (attendedEvents.data.length === 0) {
    return <NoData className="mt-10 text-lg text-center">No Events!</NoData>;
  }

  return <EventsList list={attendedEvents.data} />;
});

Events.defaultProps = {
  dates: {},
  onDataLoaded: () => null,
};

export default Events;
