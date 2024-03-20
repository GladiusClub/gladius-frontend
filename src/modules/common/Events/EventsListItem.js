import React from "react";

import { Popover } from "components/Popover";
import EventPopoverContent from "./EventPopoverContent";
import EventPopoverTarget from "./EventPopoverTarget";

const EventsListItem = ({ item }) => {
  return (
    <Popover>
      <EventPopoverTarget content={item} />
      <EventPopoverContent content={item} />
    </Popover>
  );
};

export default EventsListItem;
