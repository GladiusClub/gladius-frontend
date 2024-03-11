/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Fade from "@mui/material/Fade";

import Tabs from "components/Tabs";
import Tab from "components/Tabs/Tab";
import Typography from "components/Typography";
import CurrentMonth from "modules/leaderboard/CurrentMonth";
import Season from "modules/leaderboard/Season";
import { useUserProfile } from "context/userProfile/useUserProfile";
import useClub from "hooks/useClub";

const Leaderboard = () => {
  const { members, getMembersList } = useClub();
  const { user } = useUserProfile();

  useEffect(() => {
    if (user.clubId) {
      getMembersList(user.clubId);
    }
  }, [user.clubId]);

  return (
    <Fade in={true}>
      <div>
        <Typography className="text-center text-xl">Leaderboard</Typography>
        <Tabs
          className="mt-10 bg-dark p-1"
          classes={{
            active: "bg-gradient-active",
          }}
        >
          <Tab label="Current month">
            <CurrentMonth members={members} />
          </Tab>
          <Tab label="Season">
            <Season members={members} />
          </Tab>
        </Tabs>
      </div>
    </Fade>
  );
};

export default Leaderboard;
