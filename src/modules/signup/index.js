import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, updateProfile } from "firebase/auth";

import Typography from "components/Typography";
import useValidate from "components/OutlinedInput/useValidate";
import Form from "./Form";
import useFirebase from "services/firebase/useFirebase";
import { auth } from "services/firebase/firebase-config";
import { generateEmailFromName, generatePassword } from "utils/commonUtils";
import { unProtectedRoutes } from "constants/routes";

const SignupForm = () => {
  const [values, setValues] = useState({
    guardianName: "",
    guardianEmail: "",
    guardianPassword: "",
    guardianConfirmPassword: "",
    studentName: "",
  });
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const { errors, validateOnBlur, validateOnSubmit } = useValidate(values);
  const { firebaseError, signUpUser } = useFirebase();

  const navigate = useNavigate();

  const handleBlur = (name, value) => {
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    validateOnBlur(name, newValues);
  };

  const signupUsersAndUpdateProfile = async (values) => {
    const studentEmail = generateEmailFromName(values.studentName);
    const studentPassword = generatePassword();
    setLogs(["Registering student"]);
    const studentResponse = await signUpUser(studentEmail, studentPassword);

    if (studentResponse?.user) {
      const student = {
        uid: studentResponse.user.uid,
        password: studentPassword,
      };

      setLogs((prev) => [...prev, "Student Registered"]);

      await updateProfile(studentResponse.user, {
        displayName: values.studentName,
      });

      await signOut(auth);

      setLogs((prev) => [...prev, "Registering guardian"]);

      const guardianResponse = await signUpUser(
        values.guardianEmail,
        values.guardianPassword
      );

      if (guardianResponse?.user) {
        const guardian = { uid: guardianResponse.user.uid };

        setLogs((prev) => [...prev, "Guardian registered"]);

        await updateProfile(guardianResponse.user, {
          displayName: values.guardianName,
        });

        navigate(unProtectedRoutes.enroll, {
          state: {
            guardian,
            student,
          },
          replace: true,
        });
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
    const isValid = validateOnSubmit(values);

    if (isValid) {
      try {
        setLoading(true);
        await signupUsersAndUpdateProfile(values);
      } catch (err) {
        console.error("Error occurred in Signup flow!");
        console.error(err);
      } finally {
        setLoading(false);
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
      <Form
        logs={logs}
        loading={loading}
        errors={errors}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default SignupForm;
