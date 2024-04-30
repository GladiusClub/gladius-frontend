import { useMemo } from "react";
import { useParams } from "react-router-dom";
import useUserProfile from "context/userProfile/useUserProfile";
import { memberRoles } from "constants/common";
import { params } from "constants/routes";

const useStudentAsUser = () => {
  const { user } = useUserProfile();
  const locationParams = useParams();
  const studentUid = locationParams[params.studentUid];

  const studentAsUser = useMemo(() => {
    if (user.role === memberRoles.parent && user.students?.length) {
      return (
        user.students.find((student) => student.uid === studentUid) || user
      );
    }
    return user;
  }, [user, studentUid]);

  return { user: studentAsUser };
};

export default useStudentAsUser;
