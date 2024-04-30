/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import useFirebase from "services/firebase/useFirebase";
import { fetchEventsWithRsvp } from "api/rsvpApi";
import useStudentAsUser from "./useStudentAsUser";

const useEventsWithRsvp = (events) => {
  const { checkForNavigateToSignIn } = useFirebase();
  const { user } = useStudentAsUser();
  const [eventsWithRsvp, setEventsWithRsvp] = useState({
    data: [...events],
    loading: false,
    error: null,
  });

  useEffect(() => {
    setEventsWithRsvp((prev) => ({ ...prev, data: [...events] }));
    if (user.club) {
      getEventsWithRsvp(events);
    }
  }, [user.club, events]);

  const handleFailure = (err) => {
    console.error(err);
    checkForNavigateToSignIn(err.code);
  };

  const getEventsWithRsvp = async (events) => {
    setEventsWithRsvp((prev) => ({ ...prev, loading: true }));
    try {
      const data = await fetchEventsWithRsvp({
        events,
        uid: user.uid,
        clubId: user.club.id,
      });
      setEventsWithRsvp({ data, error: null, loading: false });
    } catch (err) {
      console.error("Error getting events");
      handleFailure(err);
      setEventsWithRsvp({ data: [], error: err.message, loading: false });
    }
  };

  return {
    eventsWithRsvp,
  };
};

export default useEventsWithRsvp;
