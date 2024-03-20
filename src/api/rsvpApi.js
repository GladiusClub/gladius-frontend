import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "services/firebase/firebase-config";

export const fetchEventsWithRsvp = async ({ events, uid, clubId }) => {
  if (!events.length) {
    return events;
  }

  // Get reference to eventRsvps collection
  const eventRsvpsRef = collection(
    db,
    `clubs/${clubId}/members/${uid}/eventRsvps`
  );

  const eventRsvpsQuery = query(
    eventRsvpsRef,
    where(
      "eventId",
      "in",
      events.map(({ id }) => id)
    )
  );

  const eventRsvpsDocs = await getDocs(eventRsvpsQuery);
  const eventRsvpsByIdAndDate = {};

  if (!eventRsvpsDocs.empty) {
    eventRsvpsDocs.docs.forEach((eventRsvpDoc) => {
      const eventRsvpData = eventRsvpDoc.data();
      eventRsvpData.id = eventRsvpDoc.id;
      eventRsvpsByIdAndDate[
        `${eventRsvpData.eventId}And${eventRsvpData.date}`
      ] = eventRsvpData;
    });
  }

  const eventsWithRsvp = events.map((event) => {
    const eventRsvpData = eventRsvpsByIdAndDate[`${event.id}And${event.date}`];
    if (eventRsvpData) {
      return {
        ...event,
        rsvpId: eventRsvpData.id,
        rsvp: eventRsvpData.rsvp,
      };
    }
    return { ...event };
  });

  return eventsWithRsvp;
};
