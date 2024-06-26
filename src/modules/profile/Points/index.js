/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import NoData from "components/NoData";
import useUserProfile from "context/userProfile/useUserProfile";
import useAttendedEvents from "hooks/useAttendedEvents";
import PointsList from "./PointsList";
import PointsInfo from "./PointsInfo";
import PointsSendReceive from "./PointsSendReceive";

const Points = () => {
  const { user } = useUserProfile();
  const { attendedEvents, getAttendedEvents } = useAttendedEvents();

  useEffect(() => {
    if (user.club) {
      getAttendedEvents({ maxDate: new Date() });
    }
  }, [user.club]);

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
    return (
      <div className="mt-10">
        <PointsInfo />
        <PointsSendReceive />
        <NoData className="mt-10 text-lg text-center" />
      </div>
    );
  }

  return (
    <div className="mt-10">
      <PointsInfo />
      <PointsSendReceive />
      <PointsList title="Received" list={attendedEvents.data} />
    </div>
  );
};

export default Points;
