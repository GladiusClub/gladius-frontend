import React from "react";

import Typography from "components/Typography";

const PositionInfo = () => {
  return (
    <div className="p-3 bg-info rounded-xl flex items-center gap-5">
      <div className="bg-secondary rounded-xl flex justify-center items-center p-2 text-xl">
        #5
      </div>
      <Typography>You are doing better than 65% of your friends</Typography>
    </div>
  );
};

export default PositionInfo;
