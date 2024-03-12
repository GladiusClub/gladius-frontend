/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useEffect } from "react";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";

import Loader from "components/Loader";
import { useUserProfile } from "context/userProfile/useUserProfile";
import useClub from "hooks/useClub";
import Performers from "../common/Performers";
import NonPerformers from "../common/NonPerformers";
import PositionInfo from "../common/PositionInfo";

const Season = () => {
  const { user } = useUserProfile();
  const { members, getMembersList } = useClub();

  useEffect(() => {
    if (user.clubId) {
      getMembersList(user.clubId, [1, "year"]);
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
    return (
      <div className="mt-10 text-lg text-center">No data for this month!</div>
    );
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

export default Season;
