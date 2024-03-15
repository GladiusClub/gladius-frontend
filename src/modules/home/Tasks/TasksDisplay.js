/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import Loader from "components/Loader";
import NoData from "components/NoData";
import { useUserProfile } from "context/userProfile/useUserProfile";
import useEvents from "hooks/useEvents";
import TasksList from "./TasksList";

const TasksDisplay = memo(({ dates, onDataLoaded }) => {
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

  return <TasksList list={events.data} />;
});

export default TasksDisplay;
