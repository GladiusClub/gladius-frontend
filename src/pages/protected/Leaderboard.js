import React from "react";

import Tabs from "components/Tabs";
import Tab from "components/Tabs/Tab";
import Typography from "components/Typography";
import CurrentMonth from "modules/leaderboard/currentMonth";
import Season from "modules/leaderboard/season";

const Leaderboard = () => {
  return (
    <div>
      <Typography className="text-center text-xl mt-5">Leaderboard</Typography>
      <Tabs className="mt-10">
        <Tab label="Current month">
          <CurrentMonth />
        </Tab>
        <Tab label="Season">
          <Season />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Leaderboard;
