import dayjs from "dayjs";
import { compact, uniqBy, keyBy } from "lodash";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

import { db } from "services/firebase/firebase-config";
import { isDefined } from "utils/commonUtils";
import { apiUrls } from "constants/urls";
import { collections } from "constants/collections";

const GOOGLE_CALENDAR_API_KEY = process.env.REACT_APP_CALENDAR_APIKEY;

let eventCache = {};

export const fetchAttendedEvents = async ({
  minDate,
  maxDate,
  uid,
  clubId,
  calendarId,
}) => {
  // Get reference to attendance collection of the user
  const attendanceRef = collection(
    db,
    `${collections.clubs}/${clubId}/${collections.members}/${uid}/${collections.attendance}`
  );

  // Get attendance data using query
  const datesQuery = [];
  if (minDate) {
    datesQuery.push(where("date", ">=", dayjs(minDate).format("YYYY-MM-DD")));
  }
  if (maxDate) {
    datesQuery.push(where("date", "<=", dayjs(maxDate).format("YYYY-MM-DD")));
  }

  const attendanceQuery = query(
    attendanceRef,
    ...datesQuery,
    orderBy("date", "desc")
  );

  // Get all the attendance for the user
  const attendanceDocs = await getDocs(attendanceQuery);

  if (attendanceDocs.empty) {
    return [];
  }

  const attendances = attendanceDocs.docs.map((attendanceDoc) =>
    attendanceDoc.data()
  );

  // Get unique event ids
  const eventIds = uniqBy(attendances, "eventParentId").map(
    (item) => item.eventParentId
  );

  // Get events from google calendar
  const datesParams = {};
  if (minDate) {
    datesParams.timeMin = dayjs(minDate).toISOString();
  }
  if (maxDate) {
    datesParams.timeMax = dayjs(maxDate).toISOString();
  }

  const datesQueryParam = Object.entries(datesParams)
    .map(([param, value]) => `${param}=${value}`)
    .join("&");

  const eventsPromises = eventIds.map(async (eventId) => {
    try {
      if (eventId && !eventCache[eventId]) {
        const response = await fetch(
          `${apiUrls.calendarApi}/${calendarId}/events/${eventId}?key=${GOOGLE_CALENDAR_API_KEY}&${datesQueryParam}`
        );
        return response.json();
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
        startTime: dayjs(eventData.start.dateTime).format("HH:mm"),
        date: attendanceData.date,
        score: +attendanceData.score,
        rsvp: attendanceData.attended,
      };
    }
    return null;
  });

  return compact(pastEvents);
};
