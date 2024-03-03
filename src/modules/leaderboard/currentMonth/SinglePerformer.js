import React from "react";
import classNames from "classnames";

import Typography from "components/Typography";

const classes = {
  2: {
    root: "mt-14",
    rank: "bg-gradient-active w-7 h-7 text-sm",
    avatar: "w-24 h-24",
  },
  1: {
    rank: "bg-secondary w-10 h-10 text-lg",
    avatar: "w-32 h-32",
  },
  3: {
    root: "mt-14",
    rank: "bg-dark w-7 h-7 text-sm",
    avatar: "w-24 h-24",
  },
};

const SinglePerformer = ({ performer, position }) => {
  const classObj = classes[position];

  return (
    <div
      className={classNames(
        "flex flex-col items-center relative",
        classObj.root
      )}
    >
      <Typography
        variant="span"
        className={classNames(
          "absolute left-0 rounded-full flex justify-center items-center font-semibold",
          classObj.rank
        )}
      >
        {position}
      </Typography>
      <img
        src={performer.avatar}
        className={classNames(
          "rounded-full border border-primary",
          classObj.avatar
        )}
        alt={performer.name}
      />
      <Typography variant="span">{performer.name}</Typography>
      <Typography variant="span" className="text-secondary text-lg">
        {performer.points}
      </Typography>
      <Typography variant="span" className="text-neutral text-sm">
        points
      </Typography>
    </div>
  );
};

export default SinglePerformer;
