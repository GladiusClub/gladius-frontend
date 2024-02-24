import React from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import Typography from "components/Typography";

const PointsInfo = () => {
  return (
    <div className="flex items-center flex-col">
      <Typography className="text-lg">Points balance</Typography>
      <Typography className="text-4xl text-secondary mt-1">1,250</Typography>
      <Typography className="text-success">
        <ArrowDropUpIcon className="w-8 h-8" />
        <Typography variant="span" className="text-sm -ml-1">
          150 points last week (+13.6%)
        </Typography>
      </Typography>
    </div>
  );
};

export default PointsInfo;
