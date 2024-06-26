/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { compact } from "lodash";

import { eventsByDateCache, fetchEventsByDate } from "api/eventsApi";
import useFirebase from "services/firebase/useFirebase";
import useStudentAsUser from "./useStudentAsUser";

const emptyArray = [];

const useEventsByDate = (dates) => {
  const { user } = useStudentAsUser();
  const { checkForNavigateToSignIn } = useFirebase();
  const [eventsByDate, setEventsByDate] = useState({
    data: eventsByDateCache,
    loading: false,
    error: null,
  });

  const events = useMemo(() => {
    let eventsByDates = [];
    if (Array.isArray(dates)) {
      const validDates = compact(dates);
      eventsByDates = validDates.map((date) => {
        const dateString = dayjs(date).format("YYYY-MM-DD");
        return eventsByDate.data[dateString] || emptyArray;
      });
    } else {
      const dateString = dayjs(dates).format("YYYY-MM-DD");
      eventsByDates = eventsByDate.data[dateString] || emptyArray;
    }
    return eventsByDates.flat();
  }, [dates, eventsByDate.data]);

  useEffect(() => {
    if (user.club) {
      getEventsByDate();
    }
  }, [user.club]);

  const handleFailure = (err) => {
    console.error(err);
    checkForNavigateToSignIn(err.code);
  };

  const getEventsByDate = async () => {
    setEventsByDate((prev) => ({ ...prev, loading: true }));
    try {
      const data = await fetchEventsByDate({
        uid: user.uid,
        clubId: user.club.id,
        calendarId: user.club.calendarId,
      });
      setEventsByDate({ data, error: null, loading: false });
    } catch (err) {
      console.error("Error getting events by date");
      handleFailure(err);
      setEventsByDate({ data: {}, error: err.message, loading: false });
    }
  };

  return {
    eventsByDate: {
      ...eventsByDate,
      data: events,
    },
  };
};

export default useEventsByDate;
