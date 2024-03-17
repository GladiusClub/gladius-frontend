import React from "react";

import { Popover } from "components/Popover";
import EventPopoverContent from "./EventPopoverContent";
import EventPopoverTarget from "./EventPopoverTarget";

const TasksListItem = ({ item }) => {
  return (
    <Popover>
      <EventPopoverTarget content={item} />
      <EventPopoverContent content={item} />
    </Popover>
  );
};

export default TasksListItem;
