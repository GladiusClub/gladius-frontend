import React, { useMemo } from "react";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";

import Loader from "components/Loader";
import Performers from "../common/Performers";
import NonPerformers from "../common/NonPerformers";
import PositionInfo from "../common/PositionInfo";

const Season = ({ members }) => {
  const { performers, nonPerformers } = useMemo(() => {
    const leaderboardList = members.data.filter((item) => !!item.score);
    return {
      performers: leaderboardList.slice(0, 3),
      nonPerformers: leaderboardList.slice(3),
    };
  }, [members.data]);

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
      <div className="mt-10 text-lg text-center">No data for this season!</div>
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
