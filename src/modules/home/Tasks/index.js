import React, { useState } from "react";

import Typography from "components/Typography";
import Tabs from "components/Tabs";
import Tab from "components/Tabs/Tab";
import Events from "modules/common/Events/AttendedEvents";
import EventsList from "modules/common/Events/EventsList";
import useEventsByDate from "hooks/useEventsByDate";
import useEventsWithRsvp from "hooks/useEventsWithRsvp";
import { getNextDay, getPrevDay } from "utils/dateUtils";

const today = new Date();
const tomorrow = getNextDay();

const dates = {
  previous: { maxDate: getPrevDay() },
};

const Tasks = () => {
  const [previousEventsCount, setPreviousEventsCount] = useState(0);
  const { eventsByDate: todayEventsByDate } = useEventsByDate(today);
  const { eventsByDate: tomorrowEventsByDate } = useEventsByDate(tomorrow);
  const { eventsWithRsvp: todayEventsWithRsvp } = useEventsWithRsvp(
    todayEventsByDate.data
  );
  const { eventsWithRsvp: tomorrowEventsWithRsvp } = useEventsWithRsvp(
    tomorrowEventsByDate.data
  );

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
        <Tab label={`Today (${todayEventsByDate.data.length})`}>
          <EventsList list={todayEventsWithRsvp.data} />
        </Tab>
        <Tab label={`Tomorrow (${tomorrowEventsByDate.data.length})`}>
          <EventsList list={tomorrowEventsWithRsvp.data} />
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
