import React from "react";

import Typography from "components/Typography";
import ScoreOverview from "modules/home/ScoreOverview";
import Tasks from "modules/home/Tasks";
import sportClub from "assets/sport-club.jpeg";

const Home = () => {
  return (
    <div>
      <Typography className="text-center text-xl">Dashboard</Typography>
      <div className="flex justify-center items-center gap-3 my-5">
        <img
          src={sportClub}
          alt="sport-club"
          className="w-10 h-10 rounded-full"
        />
        <Typography variant="span" className="text-lg">
          Sport Club
        </Typography>
      </div>
      <ScoreOverview />
      <Tasks />
    </div>
  );
};

export default Home;
