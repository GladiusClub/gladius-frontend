import React from "react";
import { Navigate, useParams } from "react-router-dom";
import Fade from "@mui/material/Fade";

import Dates from "modules/calendar/Dates";
import GroupEvents from "modules/calendar/Events/GroupEvents";
import { DatesSelectionProvider } from "modules/calendar/context/DatesSelection/DatesSelectionContext";
import { params, protectedRoutes } from "constants/routes";

const initialDatesOnSilder = 2;

const Calendar = () => {
  const locationParams = useParams();

  if (!locationParams[params.studentUid]) {
    return <Navigate to={protectedRoutes.guardian.home} replace />;
  }

  return (
    <Fade in={true}>
      <div>
        <DatesSelectionProvider initialDatesOnSilder={initialDatesOnSilder}>
          <Dates initialDatesOnSilder={initialDatesOnSilder} />
          <GroupEvents />
        </DatesSelectionProvider>
      </div>
    </Fade>
  );
};

export default Calendar;
