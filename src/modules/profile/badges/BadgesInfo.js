import React from "react";
import { IoMdArrowDropup } from "react-icons/io";

import Typography from "components/Typography";

const BadgesInfo = () => {
  return (
    <div className="flex items-center flex-col">
      <Typography className="text-lg">My Badges</Typography>
      <Typography className="text-4xl text-secondary mt-1">24</Typography>
      <Typography className="flex text-success items-center">
        <IoMdArrowDropup className="w-7 h-7" />
        <Typography variant="span" className="text-sm">
          3 badges last week
        </Typography>
      </Typography>
    </div>
  );
};

export default BadgesInfo;
