import React, { useState } from "react";

import SelectedDate from "./SelectedDate";
import { getNextDatesByDays, getPrevDatesByDays } from "utils/dateUtils";
import "./dates.css";
import DatesBar from "./DatesBar";

const initialDate = [
  ...getPrevDatesByDays(7),
  new Date(),
  ...getNextDatesByDays(7),
];

const Dates = () => {
  const [datesToShow, setDatesToShow] = useState(initialDate);
  const [activeIndex, setActiveIndex] = useState(7);

  const handlePrevClick = () => {
    if (activeIndex === 6) {
      const prevSevenDays = getPrevDatesByDays(7, datesToShow[0]);
      const newDatesToShow = [...prevSevenDays, ...datesToShow];
      setDatesToShow(newDatesToShow);
      setActiveIndex(12);
    } else {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handleNextClick = () => {
    const lastDateIndex = datesToShow.length - 1;
    if (activeIndex === lastDateIndex - 6) {
      const nextSevenDays = getNextDatesByDays(7, datesToShow[lastDateIndex]);
      const newDatesToShow = [...datesToShow, ...nextSevenDays];
      setDatesToShow(newDatesToShow);
    }
    setActiveIndex((prev) => prev + 1);
  };

  return (
    <div className="mt-5 date-selector">
      <SelectedDate
        date={datesToShow[activeIndex]}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
      />
      <DatesBar activeIndex={activeIndex} datesToShow={datesToShow} />
    </div>
  );
};

export default Dates;
