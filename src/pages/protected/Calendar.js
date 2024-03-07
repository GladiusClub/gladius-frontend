import React from "react";
import Fade from "@mui/material/Fade";

import Typography from "components/Typography";
import Dates from "modules/calendar/Dates";

const Calendar = () => {
  return (
    <Fade in={true}>
      <div>
        <Typography className="text-center text-xl">Event</Typography>
        <Dates />
      </div>
    </Fade>
  );
};

export default Calendar;
