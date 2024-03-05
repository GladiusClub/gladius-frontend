import React from "react";

import Typography from "components/Typography";
import Tab from "components/Tabs/Tab";
import TasksList from "./TasksList";
import TaskTabs from "./TaskTabs";
import { tasks } from "./data";

const Tasks = () => {
  return (
    <section className="mt-10">
      <Typography className="text-xl text-primary">My tasks</Typography>
      <TaskTabs tasks={tasks}>
        <Tab label="Today">
          <TasksList tasks={tasks} />
        </Tab>
        <Tab label="Tomorrow">Tomorrow</Tab>
        <Tab label="Previous">Previous</Tab>
      </TaskTabs>
    </section>
  );
};

export default Tasks;
