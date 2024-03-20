import { useState } from "react";

import useFirebase from "services/firebase/useFirebase";
import useUserProfile from "context/userProfile/useUserProfile";
import { fetchAttendedEvents } from "api/attendedEventsApi";

const useAttendedEvents = () => {
  const { checkForNavigateToSignIn } = useFirebase();
  const { user } = useUserProfile();

  const [attendedEvents, setEvents] = useState({
    data: [],
    loading: false,
    error: null,
  });

  const handleFailure = (err) => {
    console.error(err);
    checkForNavigateToSignIn(err.code);
  };

  const getAttendedEvents = async (dates) => {
    setEvents((prev) => ({ ...prev, loading: true }));
    try {
      const data = await fetchAttendedEvents({
        ...dates,
        uid: user.uid,
        clubId: user.clubId,
        calendarId: user.club.calendarId,
      });
      setEvents({ data, error: null, loading: false });
    } catch (err) {
      console.error("Error getting events");
      handleFailure(err);
      setEvents({ data: [], error: err.message, loading: false });
    }
  };

  return {
    attendedEvents,
    getAttendedEvents,
  };
};

export default useAttendedEvents;
