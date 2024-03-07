import React from "react";

import Typography from "components/Typography";

const SelectedDate = ({ date, onPrevClick, onNextClick }) => {
  return (
    <div className="flex justify-between items-center">
      <button onClick={onPrevClick}>Prev</button>
      <div className="flex flex-col items-center gap-0">
        <Typography variant="span" className="text-xl">
          {date.toLocaleDateString()}
        </Typography>
        <Typography variant="span" className="text-neutral text-sm">
          No events
        </Typography>
      </div>
      <button onClick={onNextClick}>Next</button>
    </div>
  );
};

export default SelectedDate;
