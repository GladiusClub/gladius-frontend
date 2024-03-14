import dayjs from "dayjs";
import { compact, uniqBy, keyBy } from "lodash";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

import { db } from "services/firebase/firebase-config";
import { isDefined } from "utils/commonUtils";

const googleCalendarApiKey = process.env.REACT_APP_CALENDAR_APIKEY;

let eventCache = {};

export const fetchEvents = async (clubId, uid, calendarId, operator) => {
  // Get reference to attendance collection of the user
  const attendanceRef = collection(
    db,
    `clubs/${clubId}/members/${uid}/attendance`
  );

  const todaysDate = dayjs();
  // Get attendance data less than today's date
  const attendanceQuery = query(
    attendanceRef,
    where("date", operator, todaysDate.format("YYYY-MM-DD")),
    orderBy("date", "desc")
  );

  // Get all the attendance for the user
  const attendanceDocs = await getDocs(attendanceQuery);

  if (!attendanceDocs.empty) {
    const attendances = attendanceDocs.docs.map((attendanceDoc) =>
      attendanceDoc.data()
    );

    // Get unique event ids
    const eventIds = uniqBy(attendances, "eventParentId").map(
      (item) => item.eventParentId
    );

    // Get events from google calendar
    const timeMax = new Date().toISOString();
    const eventsPromises = eventIds.map(async (eventId) => {
      try {
        if (eventId && !eventCache[eventId]) {
          const response = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}?key=${googleCalendarApiKey}&timeMax=${timeMax}`
          );
          return await response.json();
        }
      } catch (err) {
        console.error(err);
      }
    });

    const eventsData = compact(await Promise.all(eventsPromises));

    Object.assign(eventCache, keyBy(eventsData, "id"));

    // Genrate past events as we have both attendance and events data
    const pastEvents = attendances.map((attendanceData) => {
      const { eventParentId } = attendanceData;
      const eventData = eventCache[eventParentId];
      
      if (eventData && isDefined(attendanceData.score)) {
        return {
          summary: eventData.summary,
          location: eventData.location,
          date: attendanceData.date,
          score: +attendanceData.score,
        };
      }
      return null;
    });

    return compact(pastEvents);
  }
};
