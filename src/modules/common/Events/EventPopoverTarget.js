import React from "react";
import dayjs from "dayjs";

import Typography from "components/Typography";
import BinarySwitch from "components/BinarySwitch";
import { PopoverTarget } from "components/Popover";
import useFirebase from "services/firebase/useFirebase";
import useUserProfile from "context/userProfile/useUserProfile";
import { isDefined } from "utils/commonUtils";

const EventPopoverTarget = ({ content }) => {
  const { addDocData, updateDocData } = useFirebase();
  const { user } = useUserProfile();

  const handleSwitchClick = (rsvp) => {
    if (isDefined(content.rsvpId)) {
      updateDocData(
        `clubs/${user.clubId}/members/${user.uid}/eventRsvps`,
        content.rsvpId,
        { rsvp }
      );
    } else {
      addDocData(`clubs/${user.clubId}/members/${user.uid}/eventRsvps`, {
        eventId: content.id,
        date: content.date,
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
            {content.summary}
          </Typography>
          <Typography variant="span" className="text-lg">
            {content.startTime}
          </Typography>
          <Typography variant="span" className="text-sm w-3/5">
            {content.location}
          </Typography>
          <Typography variant="span" className="text-sm text-neutral">
            {dayjs(content.date).format("MMMM D, YYYY")}
          </Typography>
          <div className="w-full">
            {content.score && (
              <Typography variant="span" className="text-sm text-secondary">
                {content.score} points
              </Typography>
            )}
            {content.badges && (
              <Typography
                variant="span"
                className="text-sm text-secondary ml-5"
              >
                {content.badges} badges
              </Typography>
            )}
          </div>
          <Typography variant="span" className="text-sm text-primary">
            Attendance
          </Typography>
          <BinarySwitch
            onSwitchClick={handleSwitchClick}
            value={content.rsvp}
            disabled={dayjs(content.date).isBefore(dayjs())}
          />
        </div>
      </div>
    </PopoverTarget>
  );
};

export default EventPopoverTarget;
