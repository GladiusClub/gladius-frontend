/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useEffect, memo } from "react";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";

import NoData from "components/NoData";
import useUserProfile from "context/userProfile/useUserProfile";
import useGroupMembers from "hooks/useGroupMembers";
import Performers from "./Performers";
import NonPerformers from "./NonPerformers";
import PositionInfo from "./PositionInfo";

const MonthOrSeason = memo(({ dates }) => {
  const { user } = useUserProfile();
  const { members, getGroupMembers } = useGroupMembers();

  useEffect(() => {
    if (user.club) {
      getGroupMembers(dates);
    }
  }, [user.club, dates]);

  const { performers, nonPerformers } = useMemo(() => {
    const leadersList = members.data.filter(
      (member) => !!member.score || member.id === user.uid
    );
    return {
      performers: leadersList.slice(0, 3),
      nonPerformers: leadersList.slice(3),
    };
  }, [members.data, user.uid]);

  if (members.loading) {
    return (
      <div className="mt-10 h-full flex justify-center item-center">
        <CircularProgress />
      </div>
    );
  }

  if (members.error) {
    return (
      <div className="mt-10 text-secondary text-lg text-center">
        Failed to load!
      </div>
    );
  }

  if (performers.length === 0) {
    return <NoData className="mt-10 text-lg text-center" />;
  }

  return (
    <Fade in={true}>
      <div className="mt-10">
        <PositionInfo membersList={members.data} />
        <Performers performers={performers} />
        <NonPerformers nonPerformers={nonPerformers} />
      </div>
    </Fade>
  );
});

export default MonthOrSeason;
