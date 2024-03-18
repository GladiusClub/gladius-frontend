import { useState } from "react";

import useFirebase from "services/firebase/useFirebase";
import useUserProfile from "context/userProfile/useUserProfile";
import { fetchEvents } from "api/eventsApi";

const useEvents = () => {
  const { checkForNavigateToSignIn } = useFirebase();
  const { user } = useUserProfile();

  const [events, setEvents] = useState({
    data: [],
    loading: false,
    error: null,
  });

  const handleFailure = (err) => {
    console.error(err);
    checkForNavigateToSignIn(err.code);
  };

  const getEvents = async (dates) => {
    setEvents((prev) => ({ ...prev, loading: true }));
    try {
      const data = await fetchEvents({
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
    events,
    getEvents,
  };
};

export default useEvents;
