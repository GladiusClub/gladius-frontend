import React from "react";
import classNames from "classnames";

import Typography from "components/Typography";

const NonPerformerListItem = ({ item, rank }) => {
  return (
    <div className="flex items-center gap-4 p-3">
      <Typography
        variant="span"
        className={classNames(
          "text-lg font-semibold border border-primary rounded-full flex justify-center items-center w-10 h-10 bg-dark",
          {
            "border-none": item.active,
          },
        )}
      >
        {rank}
      </Typography>
      <img
        src={item.avatar}
        className="rounded-full w-12 h-12"
        alt={item.name}
      />
      <div>
        <Typography className="text-lg font-semibold ">{item.name}</Typography>
        <Typography
          className={classNames("text-secondary text-sm", {
            "text-dark font-semibold": item.active,
          })}
        >
          {item.points} points
        </Typography>
      </div>
    </div>
  );
};

export default NonPerformerListItem;
