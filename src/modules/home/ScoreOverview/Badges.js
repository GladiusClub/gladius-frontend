/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { TbJewishStarFilled } from "react-icons/tb";

import Typography from "components/Typography";
import useBadges from "hooks/useBadges";

const Badges = () => {
  const { badges, getBadges } = useBadges();

  useEffect(() => {
    getBadges();
  }, []);

  if (badges.loading) {
    return (
      <div className="flex justify-center item-center text-xs mt-8">
        Loading badges...
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2 mt-5 justify-center">
        <TbJewishStarFilled className="text-primary w-7 h-7" />
        <Typography variant="h2" className="text-secondary">
          {badges.data.length}
        </Typography>
      </div>
      <Typography className="text-neutral text-sm">+ {badges.data.length} last week</Typography>
    </>
  );
};

export default Badges;
