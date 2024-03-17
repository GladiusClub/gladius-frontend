/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState } from "react";

import { getDatesRange } from "utils/dateUtils";

export const EventsByDateContext = createContext({});

export const EventsByDateProvider = ({ children, initialDatesOnSilder }) => {
  const [datesToSlide, setDatesToSlide] = useState(
    getDatesRange(initialDatesOnSilder, new Date())
  );
  const [activeIndex, setActiveIndex] = useState(initialDatesOnSilder);
  const [eventsCount, setEventsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  return (
    <EventsByDateContext.Provider
      value={{
        datesToSlide,
        activeIndex,
        eventsCount,
        loading,
        setDatesToSlide,
        setActiveIndex,
        setEventsCount,
        setLoading,
      }}
    >
      {children}
    </EventsByDateContext.Provider>
  );
};
