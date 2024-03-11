import React from "react";
import Fade from "@mui/material/Fade";

import Typography from "components/Typography";
import ScoreOverview from "modules/home/ScoreOverview";
import Tasks from "modules/home/Tasks";
import { useUserProfile } from "context/userProfile/useUserProfile";

const Home = () => {
  const { user } = useUserProfile();

  return (
    <Fade in={true}>
      <div>
        <Typography className="text-center text-xl">Dashboard</Typography>
        {user.club && (
          <div className="flex justify-center items-center gap-3 mt-5">
            <img
              src={user.club.src || `https://ui-avatars.com/api?name=${user.club.name}`}
              alt="sport-club"
              className="w-10 h-10 rounded-full"
            />
            <Typography variant="span" className="text-lg">
              {user.club.name}
            </Typography>
          </div>
        )}
        <ScoreOverview />
        <Tasks />
      </div>
    </Fade>
  );
};

export default Home;
