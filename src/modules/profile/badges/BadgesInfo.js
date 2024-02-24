import React from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import Typography from "components/Typography";

const BadgesInfo = () => {
  return (
    <div className="flex items-center flex-col">
      <Typography className="text-lg">My Badges</Typography>
      <Typography className="text-4xl text-secondary mt-1">24</Typography>
      <Typography className="text-success">
        <ArrowDropUpIcon className="w-8 h-8" />
        <Typography variant="span" className="text-sm -ml-1">
          3 badges last week
        </Typography>
      </Typography>
    </div>
  );
};

export default BadgesInfo;
