/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import NoData from "components/NoData";
import useBadges from "hooks/useBadges";
import BadgesList from "./BadgesList";
import BadgesInfo from "./BadgesInfo";

const Badges = () => {
  const { badges, getBadges } = useBadges();

  useEffect(() => {
    getBadges();
  }, []);

  if (badges.loading) {
    return (
      <div className="mt-10 h-full flex justify-center item-center">
        <CircularProgress />
      </div>
    );
  }

  if (badges.error) {
    return (
      <div className="mt-10 text-secondary text-lg text-center">
        Failed to load!
      </div>
    );
  }

  if (badges.data.length === 0) {
    return <NoData className="mt-10 text-lg text-center" />;
  }

  return (
    <div className="mt-10">
      <BadgesInfo NumBadges={badges.data.length} />
      <BadgesList badges={badges.data} />
    </div>
  );
};

export default Badges;
