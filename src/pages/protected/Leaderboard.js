import React from "react";
import Fade from "@mui/material/Fade";

import Tabs from "components/Tabs";
import Tab from "components/Tabs/Tab";
import Typography from "components/Typography";
import MonthOrSeason from "modules/leaderboard/MonthOrSeason";

const Leaderboard = () => {
  return (
    <Fade in={true}>
      <div>
        <Typography className="text-center text-xl">Leaderboard</Typography>
        <Tabs
          className="mt-10 bg-dark p-1"
          useLazyLoad={false}
          classes={{
            active: "bg-gradient-active",
          }}
        >
          <Tab label="Current month">
            <MonthOrSeason fromDate={[1, "month"]} />
          </Tab>
          <Tab label="Season">
            <MonthOrSeason fromDate={[1, "year"]} />
          </Tab>
        </Tabs>
      </div>
    </Fade>
  );
};

export default Leaderboard;
