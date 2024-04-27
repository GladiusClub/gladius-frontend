/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import LinearProgress from "@mui/material/LinearProgress";

import Select from "components/Select";
import Typography from "components/Typography";
import useValidate from "components/OutlinedInput/useValidate";
import useClubsAndGroups from "hooks/useClubsAndGroups";
import useStellarWallet from "hooks/useStellarWallet";
import { protectedRoutes, unProtectedRoutes } from "constants/routes";
import gladiusLogo from "assets/gladius-logo.svg";
import { externalUrls } from "constants/urls";

const Enroll = () => {
  const [values, setValues] = useState({
    club: "",
    group: "",
  });
  const { errors, validateOnBlur, validateOnSubmit } = useValidate(values);
  const { clubs, groups } = useClubsAndGroups(values.club);
  const { stellarWallet, createStellarWallet } = useStellarWallet();

  const location = useLocation();
  const navigate = useNavigate();
  const locationState = location.state;

  const selectedGroup = useMemo(() => {
    return groups.data.find((group) => group.uid === values.group);
  }, [groups, values.group]);

  if (!locationState) {
    return <Navigate to={unProtectedRoutes.signUp} replace />;
  }

  const handleBlur = (name, value) => {
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    validateOnBlur(name, newValues);
  };

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
    const isValid = validateOnSubmit(values);

    if (isValid) {
      const { guardian, student } = locationState || {};

      const response = await createStellarWallet({
        ParentUID: guardian.uid,
        StudentUID: student.uid,
        StudentPassword: student.password,
        ClubUID: values.club,
        GroupUID: values.group,
      });

      if (response) {
        navigate(protectedRoutes.guardian.home, {
          replace: true,
        });
      }
    }
  };

  if (stellarWallet.loading) {
    return (
      <Fade in={true}>
        <div>
          <Typography className="text-xl text-primary mx-10 text-center">
            Creating stellar wallet and simulating EURC payment to club
          </Typography>
          <Typography className="mx-10 text-center text-sm mt-5">
            Please wait this may take upto 1 minute.
          </Typography>
          <LinearProgress
            className="w-1/2 mx-auto mt-10 bg-dark"
            sx={{
              ".MuiLinearProgress-bar": {
                background: "var(--color-neutral)",
              },
            }}
          />
        </div>
      </Fade>
    );
  }

  return (
    <Fade in={true}>
      <div>
        <img src={gladiusLogo} alt="Gladius" className="mx-auto" />
        <Typography variant="h2" className="text-center">
          Enroll student
        </Typography>
        <Typography
          className="text-secondary text-center min-h-5 text-sm my-3"
          aria-live="assertive"
        >
          {stellarWallet.error && "Some error occurred!"}
        </Typography>
        <form onSubmit={handleSubmit} className="mt-5">
          <Select
            value={values.club}
            name="club"
            label="Club"
            error={errors.club}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            {clubs.data.map((club) => (
              <MenuItem value={club.uid} key={club.uid}>
                {club.name}
              </MenuItem>
            ))}
          </Select>

          <Select
            value={values.group}
            name="group"
            label="Course"
            error={errors.group}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            {groups.data.map((group) => (
              <MenuItem value={group.uid} key={group.uid}>
                {group.name}
              </MenuItem>
            ))}
          </Select>

          {selectedGroup && (
            <Typography>
              <Typography variant="span">Course fee:</Typography>
              <Typography variant="span" className="ml-3 text-primary">
                {selectedGroup.subscriptionFee} EUR
              </Typography>
              {selectedGroup.incentiveAmount && (
                <Typography variant="span" className="ml-3 text-sm">
                  (Incentive: {selectedGroup.incentiveAmount} EUR)
                </Typography>
              )}
            </Typography>
          )}

          <Button
            type="submit"
            size="large"
            variant="contained"
            className="font-manrope w-full normal-case mt-5 bg-gradient-active"
          >
            Make payment
          </Button>

          <Typography
            variant="a"
            href={externalUrls.gladiusDocs}
            target="_blank"
            rel="noreferrer"
            className="underline break-words text-sm block mt-5 text-center"
          >
            Gladius contract terms
          </Typography>
        </form>
      </div>
    </Fade>
  );
};

export default Enroll;
