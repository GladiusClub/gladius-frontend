import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import Typography from "components/Typography";
import OutlinedInput from "components/OutlinedInput";
import {
  EmailAdornment,
  GuardianAdornment,
  PasswordAdornment,
  StudentAdornment,
} from "components/OutlinedInput/Adornments";
import useValidate from "components/OutlinedInput/useValidate";
import useFirebase from "services/firebase/useFirebase";
import { generateEmailFromName, generatePassword } from "utils/commonUtils";
import { unProtectedRoutes } from "constants/routes";

const SignupForm = () => {
  const [values, setValues] = useState({
    guardianName: "",
    guardianEmail: "",
    gurardianPassword: "",
    guardianConfirmPassword: "",
    studentName: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { errors, validateOnBlur, validateOnSubmit } = useValidate(values);
  const { firebaseError, loading, signUpUser } = useFirebase();

  const navigate = useNavigate();

  const handleBlur = (name, value) => {
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    validateOnBlur(name, newValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
    const isValid = validateOnSubmit(values);

    if (isValid) {
      const studentEmail = generateEmailFromName(values.studentName);
      const studentPassword = generatePassword();
      const studentResponse = await signUpUser(studentEmail, studentPassword);
      if (studentResponse?.user) {
        const guardianResponse = await signUpUser(
          values.guardianEmail,
          values.guardianPassword
        );
        if (guardianResponse?.user) {
          navigate(unProtectedRoutes.enroll, {
            state: {
              guardianUid: guardianResponse.user.uid,
              studentUid: studentResponse.user.uid,
            },
            replace: true,
          });
        }
      }
    }
  };

  return (
    <>
      <Typography
        className="text-secondary min-h-5 text-sm my-5"
        aria-live="assertive"
      >
        {firebaseError}
      </Typography>
      <form onSubmit={handleSubmit}>
        <OutlinedInput
          onBlur={handleBlur}
          field={{
            name: "guardianName",
            label: "Guardian name",
            required: true,
            autoComplete: "name",
            error: errors.guardianName,
          }}
          endAdornment={<GuardianAdornment />}
        />

        <OutlinedInput
          onBlur={handleBlur}
          field={{
            type: "email",
            name: "guardianEmail",
            label: "Guardian email",
            required: true,
            autoComplete: "email",
            error: errors.guardianEmail,
          }}
          endAdornment={<EmailAdornment />}
        />

        <OutlinedInput
          onBlur={handleBlur}
          field={{
            type: showPassword ? "text" : "password",
            name: "guardianPassword",
            label: "Guardian password",
            required: true,
            autoComplete: "off",
            error: errors.guardianPassword,
          }}
          endAdornment={
            <PasswordAdornment onPasswordVisibilityClick={setShowPassword} />
          }
        />

        <OutlinedInput
          onBlur={handleBlur}
          field={{
            type: showConfirmPassword ? "text" : "password",
            name: "guardianConfirmPassword",
            label: "Guardian confirm password",
            required: true,
            autoComplete: "off",
            error: errors.guardianConfirmPassword,
          }}
          endAdornment={
            <PasswordAdornment
              onPasswordVisibilityClick={setShowConfirmPassword}
            />
          }
        />

        <OutlinedInput
          onBlur={handleBlur}
          field={{
            name: "studentName",
            label: "Student name",
            required: true,
            autoComplete: "name",
            error: errors.studentName,
          }}
          endAdornment={<StudentAdornment />}
        />

        <Button
          type="submit"
          size="large"
          variant="contained"
          className="font-manrope w-full normal-case mt-5 bg-gradient-active"
        >
          {loading ? "Signing Up..." : "Sign Up as guardian"}
        </Button>
      </form>
    </>
  );
};

export default SignupForm;
