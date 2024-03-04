import React from "react";

import Tabs from "components/Tabs";

const TaskTabs = ({ children }) => {
  return (
    <Tabs
      className="mt-3 text-neutral text-sm justify-between gap-3"
      classes={{
        active: "border border-primary text-default",
        default: "border border-neutral text-neutral",
      }}
    >
      {children}
    </Tabs>
  );
};

export default TaskTabs;
