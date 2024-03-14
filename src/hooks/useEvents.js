import { useState } from "react";

import { useUserProfile } from "context/userProfile/useUserProfile";
import { useFirebase } from "services/firebase/useFirebase";
import { fetchEvents } from "api/eventsApi";

const useEvents = () => {
  const { user } = useUserProfile();
  const { checkForNavigateToSignIn } = useFirebase();
  const [events, setEvents] = useState({
    data: [],
    loading: false,
    error: null,
  });

  const handleFailure = (err) => {
    console.error(err);
    checkForNavigateToSignIn(err.code);
  };

  const getEvents = async (operator) => {
    setEvents((prev) => ({ ...prev, loading: true }));
    try {
      const data = await fetchEvents(user.clubId, user.uid, user.club.calendarId, operator);
      setEvents({ data, error: null, loading: false });
    } catch (err) {
      console.error("Error getting past events");
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
