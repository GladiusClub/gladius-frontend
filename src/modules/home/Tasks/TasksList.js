import React from "react";

import List from "components/List";
import ListItem from "components/List/ListItem";
import TasksListItem from "./TasksListItem";

const TasksList = ({ tasks }) => {
  return (
    <List>
      {tasks.map((task, index) => (
        <ListItem key={index}>
          <TasksListItem item={task} />
        </ListItem>
      ))}
    </List>
  );
};

export default TasksList;
