import React, { useState } from "react";

import DatesBar from "./DatesBar";
import SelectedDate from "./SelectedDate";
import {
  getNextDatesByDays,
  getPrevDatesByDays,
  getDatesRange,
} from "utils/dateUtils";
import "./dates.css";

const daysToSlide = 1;
const initialDatesOnSilder = 2;

const Dates = () => {
  const [datesToSlide, setDatesToSlide] = useState(
    getDatesRange(initialDatesOnSilder, new Date())
  );
  const [activeIndex, setActiveIndex] = useState(initialDatesOnSilder);

  const handlePrevClick = () => {
    if (activeIndex === 0) {
      const prevDates = getPrevDatesByDays(daysToSlide, datesToSlide[0]);
      const newdatesToSlide = [...prevDates, ...datesToSlide];
      setDatesToSlide(newdatesToSlide);
      setActiveIndex(daysToSlide - 1);
    } else {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handleNextClick = () => {
    const lastDateIndex = datesToSlide.length - 1;
    if (activeIndex === lastDateIndex) {
      const nextDates = getNextDatesByDays(
        daysToSlide,
        datesToSlide[lastDateIndex]
      );
      const newdatesToSlide = [...datesToSlide, ...nextDates];
      setDatesToSlide(newdatesToSlide);
    }
    setActiveIndex((prev) => prev + 1);
  };

  const handleDateChange = (date) => {
    setDatesToSlide(getDatesRange(initialDatesOnSilder, date));
    setActiveIndex(initialDatesOnSilder);
  };

  return (
    <div className="mt-5 date-selector">
      <SelectedDate
        date={datesToSlide[activeIndex]}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
        onDateChange={handleDateChange}
      />
      <DatesBar
        activeIndex={activeIndex}
        datesToSlide={datesToSlide}
        onDateClick={setActiveIndex}
      />
    </div>
  );
};

export default Dates;
