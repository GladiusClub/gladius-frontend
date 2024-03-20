import React from "react";
import Fade from "@mui/material/Fade";

import Typography from "components/Typography";
import Dates from "modules/calendar/Dates";
import GroupEvents from "modules/calendar/Events/GroupEvents";
import { DatesSelectionProvider } from "modules/calendar/context/DatesSelection/DatesSelectionContext";

const initialDatesOnSilder = 2;

const Calendar = () => {
  return (
    <Fade in={true}>
      <div>
        <Typography className="text-center text-xl">Event</Typography>
        <DatesSelectionProvider initialDatesOnSilder={initialDatesOnSilder}>
          <Dates initialDatesOnSilder={initialDatesOnSilder} />
          <GroupEvents />
        </DatesSelectionProvider>
      </div>
    </Fade>
  );
};

export default Calendar;
