import React, { useState } from "react";

import Typography from "components/Typography";
import Tabs from "components/Tabs";
import Tab from "components/Tabs/Tab";
import Events from "modules/common/Events";
import { getNextDay, getPrevDay } from "utils/dateUtils";

const today = new Date();
const tomorrow = getNextDay();

const dates = {
  today: { minDate: today, maxDate: today },
  tomorrow: { minDate: tomorrow, maxDate: tomorrow },
  previous: { maxDate: getPrevDay() },
};

const Tasks = () => {
  const [todayEventsCount, setTodaysEventsCount] = useState(0);
  const [tomorrowEventsCount, setTomorrowEventsCount] = useState(0);
  const [previousEventsCount, setPreviousEventsCount] = useState(0);

  return (
    <section className="mt-10">
      <Typography className="text-xl text-primary">My tasks</Typography>
      <Tabs
        className="mt-3 text-neutral text-sm justify-between gap-3"
        classes={{
          active: "border border-primary text-default",
          default: "border border-neutral text-neutral",
        }}
      >
        <Tab label={`Today (${todayEventsCount})`}>
          <Events
            dates={dates.today}
            onDataLoaded={setTodaysEventsCount}
          />
        </Tab>
        <Tab label={`Tomorrow (${tomorrowEventsCount})`}>
          <Events
            dates={dates.tomorrow}
            onDataLoaded={setTomorrowEventsCount}
          />
        </Tab>
        <Tab label={`Previous (${previousEventsCount})`}>
          <Events
            dates={dates.previous}
            onDataLoaded={setPreviousEventsCount}
          />
        </Tab>
      </Tabs>
    </section>
  );
};

export default Tasks;
