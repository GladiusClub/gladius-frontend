import React, { useEffect, useRef } from "react";

import Date from "./Date";

const DatesBar = ({ activeIndex, datesToSlide, onDateClick }) => {
  const datesBarRef = useRef(null);

  useEffect(() => {
    const scrollWidth = datesBarRef.current.scrollWidth;
    const perDateWidth = scrollWidth / datesToSlide.length;
    const scrollTo = perDateWidth * activeIndex;
    datesBarRef.current.scrollLeft = scrollTo;
  }, [datesToSlide, activeIndex]);

  return (
    <div
      className="flex justify-between mt-5 gap-3 w-full overflow-auto"
      ref={datesBarRef}
    >
      {datesToSlide.map((date, index) => {
        return (
          <Date
            key={date.toDateString()}
            date={date}
            index={index}
            activeIndex={activeIndex}
            onDateClick={onDateClick}
          />
        );
      })}
    </div>
  );
};

export default DatesBar;
