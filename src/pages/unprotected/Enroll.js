import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import Select from "components/Select";
import Typography from "components/Typography";
import useValidate from "components/OutlinedInput/useValidate";
import useClubsAndGroups from "hooks/useClubsAndGroups";
import useStellarWallet from "hooks/useStellarWallet";
import { protectedRoutes, unProtectedRoutes } from "constants/routes";
import gladiusLogo from "assets/gladius-logo.svg";
import { Fade, LinearProgress } from "@mui/material";

const Enroll = () => {
  const [values, setValues] = useState({
    club: "",
    course: "",
  });
  const { errors, validateOnBlur, validateOnSubmit } = useValidate(values);
  const { clubs, groups } = useClubsAndGroups(values.club);
  const { stellarWallet, createStellarWallet } = useStellarWallet();

  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state || {};

  if (!locationState.from?.pathname) {
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
      const { guardianUid, studentUid } = locationState;

      const response = await createStellarWallet({
        guardianId: guardianUid,
        studentId: studentUid,
        clubId: values.club,
        courseId: values.course,
      });

      if (response) {
        navigate(protectedRoutes.home, {
          replace: true,
        });
      }
    }
  };

  if (stellarWallet.loading) {
    return (
      <Fade in={true}>
        <div>
          <Typography className="text-xl mx-10 text-center">
            Creating stellar wallet and simulating EURC payment to club
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
        <form onSubmit={handleSubmit} className="mt-10">
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
            value={values.course}
            name="course"
            label="Course"
            error={errors.course}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            {groups.data.map((group) => (
              <MenuItem value={group.uid} key={group.uid}>
                {group.name}
              </MenuItem>
            ))}
          </Select>

          <Typography>
            <Typography variant="span">Course fee:</Typography>
            <Typography variant="span" className="ml-3 text-primary">
              75 EUR
            </Typography>
          </Typography>

          <Button
            type="submit"
            size="large"
            variant="contained"
            className="font-manrope w-full normal-case mt-5 bg-gradient-active"
          >
            Make payment
          </Button>
        </form>
      </div>
    </Fade>
  );
};

export default Enroll;
