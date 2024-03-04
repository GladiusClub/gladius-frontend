import React from "react";

import Typography from "components/Typography";
import BinarySwitch from "components/BinarySwitch";

const TasksListItem = ({ item }) => {
  return (
    <div className="py-5">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <Typography
          variant="span"
          className="text-lg font-semibold w-4/5 truncate"
        >
          {item.eventName}
        </Typography>
        <Typography variant="span" className="text-lg">
          {item.time}
        </Typography>
        <Typography variant="span" className="text-sm w-3/5">
          {item.location}
        </Typography>
        <Typography variant="span" className="text-sm text-neutral">
          {item.date}
        </Typography>
        <div className="w-full">
          <Typography variant="span" className="text-sm text-secondary">
            {item.points} points
          </Typography>
          {item.badges && (
            <Typography variant="span" className="text-sm text-secondary ml-5">
              {item.badges} badges
            </Typography>
          )}
        </div>
        <Typography variant="span" className="text-sm text-primary">
          Attendance
        </Typography>
        <BinarySwitch onSwitchClick={console.log} value={item.attended} />
      </div>
    </div>
  );
};

export default TasksListItem;
