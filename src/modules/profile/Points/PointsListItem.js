import React from "react";

import Typography from "components/Typography";

const PointsListItem = ({ item }) => {
  return (
    <div className="py-5">
      <div className="flex justify-between items-center">
        <Typography variant="span" className="text-lg font-semibold w-3/5 truncate">
          {item.eventName}
        </Typography>
        <Typography variant="span" className="text-secondary">
          {item.points} points
        </Typography>
      </div>
      <Typography variant="span" className="text-neutral text-sm">
        {item.date}
      </Typography>
    </div>
  );
};

export default PointsListItem;
