import React from "react";

import DatesBar from "./DatesBar";
import SelectedDate from "./SelectedDate";
import "./dates.css";
import GroupEvents from "./GroupEvents";
import { EventsByDateProvider } from "context/EventsByDate/EventsByDateContext";

const initialDatesOnSilder = 2;

const Dates = () => {
  return (
    <EventsByDateProvider initialDatesOnSilder={initialDatesOnSilder}>
      <SelectedDate initialDatesOnSilder={initialDatesOnSilder} />
      <DatesBar />
      <GroupEvents />
    </EventsByDateProvider>
  );
};

export default Dates;
