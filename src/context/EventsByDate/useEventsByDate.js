import { useContext } from "react";

import { EventsByDateContext } from "context/EventsByDate/EventsByDateContext";

const useEventsByDate = () => {
  return useContext(EventsByDateContext);
};

export default useEventsByDate;
