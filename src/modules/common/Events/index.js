/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import Loader from "components/Loader";
import NoData from "components/NoData";
import useUserProfile from "context/userProfile/useUserProfile";
import useEvents from "hooks/useEvents";
import EventsList from "./EventsList";

const Events = memo(({ dates, onDataLoaded, onLoading }) => {
  const { user } = useUserProfile();
  const { events, getEvents } = useEvents();

  useEffect(() => {
    if (user.clubId) {
      getEvents(dates);
    }
  }, [user.clubId, dates]);

  useEffect(() => {
    onDataLoaded(events.data.length);
  }, [events.data]);

  useEffect(() => {
    onLoading(events.loading);
  }, [events.loading]);

  if (events.loading) {
    return (
      <div className="mt-10 h-full flex justify-center item-center">
        <Loader>
          <CircularProgress className="w-20 h-20" />
        </Loader>
      </div>
    );
  }

  if (events.error) {
    return (
      <div className="mt-10 text-secondary text-lg text-center">
        Failed to load!
      </div>
    );
  }

  if (events.data.length === 0) {
    return <NoData className="mt-10 text-lg text-center">No Events!</NoData>;
  }

  return <EventsList list={events.data} />;
});

Events.defaultProps = {
  dates: {},
  onDataLoaded: () => null,
  onLoading: () => null,
};

export default Events;
