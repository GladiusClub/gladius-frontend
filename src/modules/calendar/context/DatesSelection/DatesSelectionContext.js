/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState } from "react";

import { getDatesRange } from "utils/dateUtils";

export const DatesSelectionContext = createContext({});

export const DatesSelectionProvider = ({ children, initialDatesOnSilder }) => {
  const [datesToSlide, setDatesToSlide] = useState(
    getDatesRange(initialDatesOnSilder, new Date())
  );
  const [activeIndex, setActiveIndex] = useState(initialDatesOnSilder);
  const [datesOfWeek, setDatesOfWeek] = useState([]);

  return (
    <DatesSelectionContext.Provider
      value={{
        datesToSlide,
        activeIndex,
        datesOfWeek,
        setDatesToSlide,
        setActiveIndex,
        setDatesOfWeek
      }}
    >
      {children}
    </DatesSelectionContext.Provider>
  );
};
