import React, { useState } from "react";
import { Button } from "@mui/material";

import List from "components/List";
import ListItem from "components/List/ListItem";
import TasksListItem from "./TasksListItem";

const TasksList = ({ list }) => {
  const [listToShow, setListToShow] = useState(list.slice(0, 5));

  const handleShowAllClick = () => {
    setListToShow(list);
  };

  return (
    <>
      <List>
        {listToShow.map((event) => (
          <ListItem key={`${event.summary}-${event.date}`}>
            <TasksListItem item={event} />
          </ListItem>
        ))}
      </List>
      {listToShow.length < list.length && (
        <Button
          variant="outlined"
          className="font-manrope text-default text-sm normal-case border-primary mt-5 rounded-lg"
          onClick={handleShowAllClick}
        >
          Show All
        </Button>
      )}
    </>
  );
};

export default TasksList;
