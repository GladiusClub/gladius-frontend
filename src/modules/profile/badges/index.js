import React from "react";

import { badges } from "./data";
import BadgesList from "./BadgesList";
import BadgesInfo from "./BadgesInfo";

const Badges = () => {
  return (
    <div className="mt-10">
      <BadgesInfo />
      <BadgesList badges={badges} />
    </div>
  );
};

export default Badges;
