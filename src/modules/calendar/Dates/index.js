import React from "react";
import dayjs from "dayjs";
import classNames from "classnames";

import useDatesSelection from "../context/DatesSelection/useDatesSelection";
import DatesBar from "./DatesBar";
import SelectedDate from "./SelectedDate";
import "./dates.css";

const Dates = ({ initialDatesOnSilder }) => {
  const { datesToSlide, activeIndex, setActiveIndex, setDatesOfWeek } =
    useDatesSelection();

  const handleShowAllClick = () => {
    const activeDate = datesToSlide[activeIndex];
    const startDate = dayjs(activeDate).startOf("week");
    const datesOfWeek = [];

    for (let i = 0; i < 7; i++) {
      datesOfWeek.push(startDate.add(i, "day").format("YYYY-MM-DD"));
    }

    setActiveIndex(-1);
    setDatesOfWeek(datesOfWeek);
  };

  return (
    <>
      <SelectedDate initialDatesOnSilder={initialDatesOnSilder} />
      <DatesBar />
      <div className="flex justify-end">
        <button
          className={classNames(
            "bg-dark border border-primary mt-5 py-1 px-3 rounded-lg",
            { "opacity-50 pointer-events-none": activeIndex === -1 }
          )}
          onClick={handleShowAllClick}
        >
          Show all events for this week
        </button>
      </div>
    </>
  );
};

export default Dates;
