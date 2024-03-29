import React from "react";
import dayjs from "dayjs";

import Typography from "components/Typography";

const PointsListItem = ({ item }) => {
  return (
    <div className="py-5">
      <div className="flex justify-between items-center">
        <Typography
          variant="span"
          className="text-lg font-semibold w-3/5 truncate"
        >
          {item.summary}
        </Typography>
        <Typography variant="span" className="text-secondary">
          {item.score} points
        </Typography>
      </div>
      {item.date && (
        <Typography variant="span" className="text-neutral text-sm">
          {dayjs(item.date).format("MMMM D, YYYY")}
        </Typography>
      )}
    </div>
  );
};

export default PointsListItem;
