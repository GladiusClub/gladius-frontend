import React from "react";
import Fade from "@mui/material/Fade";

import ScoreOverview from "modules/home/ScoreOverview";
import Tasks from "modules/home/Tasks";
import ClubInfo from "modules/home/ClubInfo";

const Home = () => {
  return (
    <Fade in={true}>
      <div>
        <ClubInfo />
        <ScoreOverview />
        <Tasks />
      </div>
    </Fade>
  );
};

export default Home;
