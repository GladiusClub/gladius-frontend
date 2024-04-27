import { useState } from "react";

import useUserProfile from "context/userProfile/useUserProfile";
import { fetchStudentsDetailsFromGuardian } from "api/studentsByGuardianApi";

const useStudentsByGuardian = () => {
  const [students, setStudents] = useState({
    data: [],
    loading: true,
    error: null,
  });
  const { user } = useUserProfile();

  const getStudentsDetailsFromGuardian = async () => {
    try {
      const data = await fetchStudentsDetailsFromGuardian(user.uid);
      setStudents({ data, error: null, loading: false });
      return data;
    } catch (err) {
      console.error("error getting students from parent");
      console.error(err);
      setStudents({ data: [], error: err.message, loading: false });
    }
  };

  return {
    students,
    getStudentsDetailsFromGuardian,
  };
};

export default useStudentsByGuardian;
