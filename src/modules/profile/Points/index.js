/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import Loader from "components/Loader";
import NoData from "components/NoData";
import useUserProfile from "context/userProfile/useUserProfile";
import useAttendedEvents from "hooks/useAttendedEvents";
import PointsList from "./PointsList";
import PointsInfo from "./PointsInfo";
import PointsSendReceive from "./PointsSendReceive";

const Points = () => {
  const { user } = useUserProfile();
  const { attendedEvents, getAttendedEvents } = useAttendedEvents();
  const [pointsBalance, setPointsBalance] = useState(0);

  useEffect(() => {
    if (user.club) {
      getAttendedEvents({ maxDate: new Date() });
    }
  }, [user.club]);

  if (attendedEvents.loading) {
    return (
      <div className="mt-10 h-full flex justify-center item-center w-30 h-30">
        <Loader className="w-20 h-20">
          <CircularProgress className="w-20 h-20" />
        </Loader>
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
    return <NoData className="mt-10 text-lg text-center" />;
  }

  return (
    <div className="mt-10">
      <PointsInfo
        eventsList={attendedEvents.data}
        pointsBalance={pointsBalance}
        setPointsBalance={setPointsBalance}
      />
      <PointsSendReceive setPointsBalance={setPointsBalance} />
      <PointsList title="Received" list={attendedEvents.data} />
    </div>
  );
};

export default Points;
