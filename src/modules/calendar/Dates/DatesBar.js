import React, { useEffect, useRef } from "react";

import Date from "./Date";

const DatesBar = ({ activeIndex, datesToShow }) => {
  const datesBarRef = useRef(null);

  useEffect(() => {
    const scrollWidth = datesBarRef.current.scrollWidth;
    const perDateWidth = scrollWidth / datesToShow.length;
    const scrollTo = perDateWidth * activeIndex;
    datesBarRef.current.scrollLeft = scrollTo;
  }, [datesToShow, activeIndex]);

  return (
    <div
      className="flex justify-between mt-5 gap-3 w-full overflow-auto"
      ref={datesBarRef}
    >
      {datesToShow.map((date, index) => {
        return (
          <Date
            key={date.toDateString()}
            date={date}
            index={index}
            activeIndex={activeIndex}
          />
        );
      })}
    </div>
  );
};

export default DatesBar;
