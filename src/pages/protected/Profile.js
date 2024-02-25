import React, { lazy } from "react";

import Tabs from "components/Tabs";
import Tab from "components/Tabs/Tab";
import Typography from "components/Typography";
import Points from "modules/profile/points";
const Badges = lazy(() => import("modules/profile/badges"));

const Profile = () => {
  return (
    <div>
      <Typography className="text-center text-xl mt-5">Wallet</Typography>
      <Tabs className="mt-10">
        <Tab label="Points">
          <Points />
        </Tab>
        <Tab label="Badges">
          <Badges />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Profile;
