import React from "react";
import dayjs from "dayjs";
import Fade from "@mui/material/Fade";

import Tabs from "components/Tabs";
import Tab from "components/Tabs/Tab";
import MonthOrSeason from "modules/leaderboard/MonthOrSeason";

const Leaderboard = () => {
  return (
    <Fade in={true}>
      <div>
        <Tabs
          className="mt-10 bg-dark p-1"
          classes={{
            active: "bg-gradient-active",
          }}
        >
          <Tab label="Current month">
            <MonthOrSeason
              dates={{
                minDate: dayjs().startOf("month"),
                maxDate: dayjs(),
              }}
            />
          </Tab>
          <Tab label="Season">
            <MonthOrSeason
              dates={{ minDate: dayjs().subtract(1, "year"), maxDate: dayjs() }}
            />
          </Tab>
        </Tabs>
      </div>
    </Fade>
  );
};

export default Leaderboard;
