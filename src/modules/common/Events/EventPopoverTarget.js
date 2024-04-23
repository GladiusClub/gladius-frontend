import React from "react";
import dayjs from "dayjs";

import Typography from "components/Typography";
import BinarySwitch from "components/BinarySwitch";
import { PopoverTarget } from "components/Popover";
import useFirebase from "services/firebase/useFirebase";
import useUserProfile from "context/userProfile/useUserProfile";
import { isDefined } from "utils/commonUtils";
import { collections } from "constants/collections";

const EventPopoverTarget = ({ event }) => {
  const { addDocData, updateDocData } = useFirebase();
  const { user } = useUserProfile();

  const handleSwitchClick = (rsvp) => {
    const collectionPath = `${collections.clubs}/${user.club.id}/${collections.members}/${user.uid}/${collections.eventRsvps}`;
    if (isDefined(event.rsvpId)) {
      updateDocData(collectionPath, event.rsvpId, { rsvp });
    } else {
      addDocData(collectionPath, {
        eventId: event.id,
        date: event.date,
        rsvp,
      });
    }
  };

  return (
    <PopoverTarget>
      <div className="py-5">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <Typography
            variant="span"
            className="text-lg font-semibold w-4/5 truncate"
          >
            {event.summary}
          </Typography>
          <Typography variant="span" className="text-lg">
            {event.startTime}
          </Typography>
          <Typography variant="span" className="text-sm w-3/5">
            {event.location}
          </Typography>
          <Typography variant="span" className="text-sm text-neutral">
            {dayjs(event.date).format("MMMM D, YYYY")}
          </Typography>
          <div className="w-full">
            {event.score && (
              <Typography variant="span" className="text-sm text-secondary">
                {event.score} points
              </Typography>
            )}
            {event.badges && (
              <Typography
                variant="span"
                className="text-sm text-secondary ml-5"
              >
                {event.badges} badges
              </Typography>
            )}
          </div>
          <Typography variant="span" className="text-sm text-primary">
            Attendance
          </Typography>
          <BinarySwitch
            onSwitchClick={handleSwitchClick}
            value={event.rsvp}
            disabled={dayjs(event.date).isBefore(dayjs())}
          />
        </div>
      </div>
    </PopoverTarget>
  );
};

export default EventPopoverTarget;
