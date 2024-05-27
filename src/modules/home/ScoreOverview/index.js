import React from "react";
import { Box } from "@mui/material";

import Typography from "components/Typography";
import colors from "theme/colors";
import league from "assets/league.svg";
import diamond from "assets/diamond.svg";
import GlcPoints from "./GlcPoints";
import Badges from "./Badges";

const style = {
  boxShadow: `0px 0px 20px 0px ${colors.shadow}`,
};

const ScoreOverview = () => {
  return (
    <Box className="flex justify-around gap-4 mt-5">
      <Box
        style={style}
        className="bg-gradient-dark p-3 rounded-2xl text-center w-1/2"
      >
        <GlcPoints />
        <Badges />
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
