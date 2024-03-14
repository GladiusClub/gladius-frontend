/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import Loader from "components/Loader";
import NoData from "components/NoData";
import { useUserProfile } from "context/userProfile/useUserProfile";
import useEvents from "hooks/useEvents";
import PointsList from "./PointsList";
import PointsInfo from "./PointsInfo";
import PointsSendReceive from "./PointsSendReceive";

const Points = () => {
  const { user } = useUserProfile();
  const { events, getEvents } = useEvents();

  useEffect(() => {
    if (user.clubId) {
      getEvents({ maxDate: new Date() });
    }
  }, [user.clubId]);

  if (events.loading) {
    return (
      <div className="mt-10 h-full flex justify-center item-center w-30 h-30">
        <Loader className="w-20 h-20">
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
    return <NoData className="mt-10 text-lg text-center" />;
  }

  return (
    <div className="mt-10">
      <PointsInfo eventsList={events.data} />
      <PointsSendReceive />
      <PointsList title="Received" list={events.data} className="mt-10" />
    </div>
  );
};

export default Points;
