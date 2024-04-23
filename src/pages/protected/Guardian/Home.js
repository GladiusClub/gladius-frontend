import React, { useState } from "react";
import Fade from "@mui/material/Fade";
import classNames from "classnames";

import Typography from "components/Typography";
import useUserProfile from "context/userProfile/useUserProfile";

const Home = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useUserProfile();

  return (
    <Fade in={true}>
      <div className="text-center">
        {user.students?.map((student) => (
          <div key={student.email} className="my-10">
            <Typography className="text-primary">{`${student.email} was added by ${user.email}`}</Typography>
            <div className="flex justify-end my-3">
              <button
                onClick={() => {
                  setIsExpanded(!isExpanded);
                }}
                className="text-right text-secondary"
              >
                {isExpanded ? "Collapse" : "Expand"}
              </button>
            </div>

            <div
              className={classNames(
                "text-left text-sm bg-neutral rounded-xl overflow-scroll font-light flex items-center",
                {
                  "h-0": !isExpanded,
                  "h-44": isExpanded,
                }
              )}
              style={{ transition: "0.5s" }}
            >
              <div className="mx-5">
                <Typography className="my-2">
                  <Typography variant="span" className="block">
                    Parent public key:
                  </Typography>
                  <Typography variant="span">{user.stellarWallet}</Typography>
                </Typography>

                <Typography className="my-2">
                  <Typography variant="span" className="block">
                    Student public key:
                  </Typography>
                  <Typography variant="span">
                    {student.stellar_wallet}
                  </Typography>
                </Typography>

                <Typography className="my-2">
                  <Typography variant="span" className="block">
                    Club public key:
                  </Typography>
                  <Typography variant="span">
                    {student.clubStellarWallet}
                  </Typography>
                </Typography>
              </div>
            </div>

            <Typography className="flex gap-3 mt-8">
              <Typography variant="span">Student name:</Typography>
              <Typography variant="span">{student.displayName}</Typography>
            </Typography>

            <div className="bg-neutral p-5 rounded-xl my-8">
              <Typography className="mb-5">Student login details</Typography>
              <Typography className="flex text-left my-1">
                <Typography variant="span" className="w-2/5">
                  Student email:
                </Typography>
                <Typography variant="span">{student.email}</Typography>
              </Typography>

              <Typography className="flex text-left my-1">
                <Typography variant="span" className="w-2/5">
                  Student password:
                </Typography>
                <Typography variant="span">{student.password}</Typography>
              </Typography>
            </div>

            <Typography className="flex gap-3">
              <Typography variant="span">Subscribed to course:</Typography>
              <Typography variant="span">{student.groupName}</Typography>
            </Typography>
          </div>
        ))}
      </div>
    </Fade>
  );
};

export default Home;
