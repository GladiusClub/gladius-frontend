import React, { useState } from "react";

import Typography from "components/Typography";
import Tabs from "components/Tabs";
import Tab from "components/Tabs/Tab";
import { getNextDay } from "utils/dateUtils";
import TasksDisplay from "./TasksDisplay";

const today = new Date();
const tomorrow = getNextDay();

const dates = {
  today: { minDate: today, maxDate: today },
  tomorrow: { minDate: tomorrow, maxDate: tomorrow },
  previous: { maxDate: today },
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
          <TasksDisplay
            dates={dates.today}
            onDataLoaded={setTodaysEventsCount}
          />
        </Tab>
        <Tab label={`Tomorrow (${tomorrowEventsCount})`}>
          <TasksDisplay
            dates={dates.tomorrow}
            onDataLoaded={setTomorrowEventsCount}
          />
        </Tab>
        <Tab label={`Previous (${previousEventsCount})`}>
          <TasksDisplay
            dates={dates.previous}
            onDataLoaded={setPreviousEventsCount}
          />
        </Tab>
      </Tabs>
    </section>
  );
};

export default Tasks;
