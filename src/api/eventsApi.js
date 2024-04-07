import dayjs from "dayjs";
import { compact, isEmpty } from "lodash";
import { RRule } from "rrule";
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "services/firebase/firebase-config";
import { apiUrls } from "constants/urls";

const GOOGLE_CALENDAR_API_KEY = process.env.REACT_APP_CALENDAR_APIKEY;

export let eventsByDateCache = {};
let isPendingRequest = false;
let resolves = [];

export const fetchEventsByDate = async ({ uid, clubId, calendarId }) => {
  // Return from cache
  if (!isEmpty(eventsByDateCache)) {
    return eventsByDateCache;
  }

  if (isPendingRequest) {
    return new Promise((resolve) => {
      resolves.push(resolve);
    });
  }

  isPendingRequest = true;

  // Get reference to groups collection of a club
  const groupsRef = collection(db, `clubs/${clubId}/groups`);

  // Get only those groups in which user is assigned
  const groupsQuery = query(
    groupsRef,
    where("member_uuids", "array-contains", uid)
  );

  const groupDocs = await getDocs(groupsQuery);

  const eventsIdObj = {};

  // Get unique eventIds
  if (!groupDocs.empty) {
    groupDocs.docs.forEach((groupDoc) => {
      const groupData = groupDoc.data();
      groupData.event_ids.forEach(({ eventId }) => {
        eventsIdObj[eventId] = true;
      });
    });
  }

  const eventIds = Object.keys(eventsIdObj);

  const eventsPromises = eventIds.map(async (eventId) => {
    try {
      if (eventId) {
        const response = await fetch(
          `${apiUrls.calendarApi}/${calendarId}/events/${eventId}?key=${GOOGLE_CALENDAR_API_KEY}`
        );
        return await response.json();
      }
    } catch (err) {
      console.error(err);
    }
  });


  const eventsData = compact(await Promise.all(eventsPromises));
  const eventsByDate = {};

  eventsData.forEach((event) => {
    const parsedRule = RRule.parseString(event.recurrence[0]);
    const rule = new RRule({
      ...parsedRule,
      dtstart: new Date(event.start.dateTime),
      until: dayjs().add(1, "year"),
    });
    const dates = rule.all();

    const eventData = {
      id: event.id,
      summary: event.summary,
      location: event.location,
      startTime: dayjs(event.start.dateTime).format("HH:mm"),
    };

    dates.forEach((date) => {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      const dateEvent = { ...eventData, date: formattedDate };
      if (eventsByDate[formattedDate]) {
        eventsByDate[formattedDate].push(dateEvent);
      } else {
        eventsByDate[formattedDate] = [dateEvent];
      }
    });
  });

  eventsByDateCache = eventsByDate;
  isPendingRequest = false;

  if (resolves.length) {
    for (const resolve of resolves) {
      resolve(eventsByDate);
    }
    resolves = [];
  }

  return eventsByDate;
};
