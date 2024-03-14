/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useEffect } from "react";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";

import Loader from "components/Loader";
import NoData from "components/NoData";
import { useUserProfile } from "context/userProfile/useUserProfile";
import useClub from "hooks/useClub";
import Performers from "./Performers";
import NonPerformers from "./NonPerformers";
import PositionInfo from "./PositionInfo";

const MonthOrSeason = ({ dates }) => {
  const { user } = useUserProfile();
  const { members, getMembers } = useClub();

  useEffect(() => {
    if (user.clubId) {
      getMembers(dates);
    }
  }, [user.clubId]);

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
      <div className="mt-10 h-full flex justify-center item-center w-30 h-30">
        <Loader className="w-20 h-20">
          <CircularProgress className="w-20 h-20" />
        </Loader>
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
};

export default MonthOrSeason;
