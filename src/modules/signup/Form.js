import React, { useState } from "react";
import classNames from "classnames";
import Button from "@mui/material/Button";

import Typography from "components/Typography";
import OutlinedInput from "components/OutlinedInput";
import {
  EmailAdornment,
  GuardianAdornment,
  PasswordAdornment,
  StudentAdornment,
} from "components/OutlinedInput/Adornments";

const Form = ({ logs, loading, errors, onBlur, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={onSubmit}>
      <OutlinedInput
        onBlur={onBlur}
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
        onBlur={onBlur}
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
        onBlur={onBlur}
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
        onBlur={onBlur}
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
        onBlur={onBlur}
        field={{
          name: "studentName",
          label: "Student name",
          required: true,
          autoComplete: "name",
          error: errors.studentName,
        }}
        endAdornment={<StudentAdornment />}
      />

      {logs.map((log, index) => (
        <Typography
          key={index}
          className="text-sm text-left font-light italic my-1"
        >
          {log}
        </Typography>
      ))}

      <Button
        type="submit"
        size="large"
        variant="contained"
        className={classNames(
          "font-manrope w-full normal-case mt-5 bg-gradient-active",
          { "pointer-events-none": loading }
        )}
      >
        {loading ? "Signing Up..." : "Sign up as guardian"}
      </Button>
    </form>
  );
};

export default Form;
