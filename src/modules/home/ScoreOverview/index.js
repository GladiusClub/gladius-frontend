/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import { PiCoins } from "react-icons/pi";
import { TbJewishStarFilled } from "react-icons/tb";

import Typography from "components/Typography";
import useUserProfile from "context/userProfile/useUserProfile";
import useAttendedEvents from "hooks/useAttendedEvents";
import { getPointsAndPercentInWeek } from "modules/utils";
import colors from "theme/colors";
import league from "assets/league.svg";
import diamond from "assets/diamond.svg";

const style = {
  boxShadow: `0px 0px 20px 0px ${colors.shadow}`,
};

const ScoreOverview = () => {
  const { user } = useUserProfile();
  const { attendedEvents, getAttendedEvents } = useAttendedEvents();

  useEffect(() => {
    if (user.clubId) {
      getAttendedEvents({ maxDate: dayjs() });
    }
  }, [user.clubId]);

  const pointsBalance = useMemo(() => {
    return attendedEvents.data.reduce((acc, curr) => acc + curr.score, 0);
  }, [attendedEvents.data]);

  const { pointsInWeek } = useMemo(() => {
    return getPointsAndPercentInWeek(pointsBalance, attendedEvents.data);
  }, [attendedEvents.data, pointsBalance]);

  return (
    <Box className="flex justify-around gap-4 mt-5">
      <Box
        style={style}
        className="bg-gradient-dark p-3 rounded-2xl text-center w-1/2"
      >
        <div className="flex items-center gap-2 justify-center">
          <PiCoins className="text-primary w-7 h-7" />
          <Typography variant="h2" className="text-secondary">
            {pointsBalance.toLocaleString()}
          </Typography>
        </div>
        <Typography className="text-neutral text-sm">
          + {pointsInWeek} last week
        </Typography>

        <div className="flex items-center gap-2 mt-5 justify-center">
          <TbJewishStarFilled className="text-primary w-7 h-7" />
          <Typography variant="h2" className="text-secondary">
            0
          </Typography>
        </div>
        <Typography className="text-neutral text-sm">+ 0 last week</Typography>
      </Box>
      <Box
        style={style}
        className="bg-gradient-dark p-3 rounded-2xl text-center w-1/2"
      >
        <div className="flex items-center gap-2 justify-center">
          <img src={league} alt="league" />
          <Typography variant="span" className="text-sm">
            Purple League
          </Typography>
        </div>

        <Typography className="text-primary text-sm mt-2">Level 4</Typography>
        <div className="bg-neutral mt-2 flex items-center justify-center relative rounded">
          <Typography variant="span" className="text-xs text-dark">
            450/500
          </Typography>
          <img src={diamond} alt="league" className="absolute right-3" />
        </div>
        <Typography className="text-xs mt-2">
          + 50 points to the next level
        </Typography>
      </Box>
    </Box>
  );
};

export default ScoreOverview;
