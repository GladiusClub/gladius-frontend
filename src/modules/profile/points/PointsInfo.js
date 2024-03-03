import React from "react";
import { IoMdArrowDropup } from "react-icons/io";

import Typography from "components/Typography";

const PointsInfo = () => {
  return (
    <div className="flex items-center flex-col">
      <Typography className="text-lg">Points balance</Typography>
      <Typography className="text-4xl text-secondary mt-1">1,250</Typography>
      <Typography className="flex text-success items-center">
        <IoMdArrowDropup className="w-7 h-7" />
        <Typography variant="span" className="text-sm ">
          150 points last week (+13.6%)
        </Typography>
      </Typography>
    </div>
  );
};

export default PointsInfo;
