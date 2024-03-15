import React from "react";
import dayjs from "dayjs";
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
          classes={{
            active: "bg-gradient-active",
          }}
        >
          <Tab label="Current month">
            <MonthOrSeason
              dates={{
                minDate: dayjs().subtract(1, "month"),
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
