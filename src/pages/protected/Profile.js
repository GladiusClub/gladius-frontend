import React, { lazy } from "react";
import Fade from "@mui/material/Fade";

import Tabs from "components/Tabs";
import Tab from "components/Tabs/Tab";
import Typography from "components/Typography";
import Points from "modules/profile/Points";
const Badges = lazy(() => import("modules/profile/Badges"));

const Profile = () => {
  return (
    <Fade in={true}>
      <div>
        <Typography className="text-center text-xl">Wallet</Typography>
        <Tabs
          lazyLoad
          className="mt-10 bg-dark p-1"
          classes={{
            active: "bg-gradient-active",
          }}
        >
          <Tab label="Points">
            <Points />
          </Tab>
          <Tab label="Badges">
            <Badges />
          </Tab>
        </Tabs>
      </div>
    </Fade>
  );
};

export default Profile;
