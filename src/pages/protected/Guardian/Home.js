import React, { useState } from "react";
import classNames from "classnames";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import Typography from "components/Typography";
import Divider from "components/Divider";
import useUserProfile from "context/userProfile/useUserProfile";
import { externalUrls } from "constants/urls";
import { protectedRoutes } from "constants/routes";

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
                "text-left text-sm bg-neutral overflow-auto rounded-xl font-light flex items-center",
                {
                  "h-0": !isExpanded,
                  "h-80": isExpanded,
                }
              )}
              style={{ transition: "0.5s" }}
            >
              <div className="px-5 w-full">
                <Typography className="my-2">
                  <Typography variant="span" className="block">
                    Parent public key:
                  </Typography>
                  <a
                    href={`${externalUrls.stellarAccount}/${user.stellarWallet}`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline break-words"
                  >
                    {`${externalUrls.stellarAccount}/${user.stellarWallet}`}
                  </a>
                </Typography>

                <Divider className="mt-3 mb-2" />

                <Typography>
                  <Typography variant="span" className="block">
                    Student public key:
                  </Typography>
                  <a
                    href={`${externalUrls.stellarAccount}/${student.stellar_wallet}`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline break-words"
                  >
                    {`${externalUrls.stellarAccount}/${student.stellar_wallet}`}
                  </a>
                </Typography>

                <Divider className="mt-3 mb-2" />

                <Typography>
                  <Typography variant="span" className="block">
                    Club public key:
                  </Typography>
                  <a
                    href={`${externalUrls.stellarAccount}/${student.club.stellarWallet}`}
                    target="_blank"
                    rel="noreferrer"
                    className="underline break-words"
                  >
                    {`${externalUrls.stellarAccount}/${student.club.stellarWallet}`}
                  </a>
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
                <Typography variant="span" className="w-24">
                  Email:
                </Typography>
                <Typography variant="span">{student.email}</Typography>
              </Typography>

              <Typography className="flex text-left my-1">
                <Typography variant="span" className="w-24">
                  Password:
                </Typography>
                <Typography variant="span">{student.password}</Typography>
              </Typography>
            </div>

            <Typography className="flex gap-3">
              <Typography variant="span">Subscribed to course:</Typography>
              <Typography variant="span">{student.groupName}</Typography>
            </Typography>

            <Link to={`${protectedRoutes.guardian.calendar}/${student.uid}`}>
              <Button
                size="large"
                variant="contained"
                className="font-manrope w-full normal-case mt-5 bg-gradient-active"
              >
                View events
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </Fade>
  );
};

export default Home;
