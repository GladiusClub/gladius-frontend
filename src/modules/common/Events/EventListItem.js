import React from "react";

import { Popover } from "components/Popover";
import EventPopoverContent from "./EventPopoverContent";
import EventPopoverTarget from "./EventPopoverTarget";

const EventListItem = ({ item }) => {
  return (
    <Popover>
      <EventPopoverTarget event={item} />
      <EventPopoverContent content={item} />
    </Popover>
  );
};

export default EventListItem;
