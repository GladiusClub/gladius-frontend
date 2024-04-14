import { useState } from "react";

import useFirebase from "services/firebase/useFirebase";
import useUserProfile from "context/userProfile/useUserProfile";
import { fetchGroupMembers } from "api/membersApi";

const useGroupMembers = () => {
  const { checkForNavigateToSignIn } = useFirebase();
  const { user } = useUserProfile();

  const [members, setMembers] = useState({
    data: [],
    loading: false,
    error: null,
  });

  const handleFailure = (err) => {
    console.error(err);
    checkForNavigateToSignIn(err.code);
  };

  const getGroupMembers = async (dates) => {
    setMembers((prev) => ({ ...prev, loading: true }));
    try {
      const data = await fetchGroupMembers({
        ...dates,
        uid: user.uid,
        clubId: user.club.id,
      });
      setMembers({ data, error: null, loading: false });
    } catch (err) {
      console.error("Error getting group members list");
      handleFailure(err);
      setMembers({ data: [], error: err.message, loading: false });
    }
  };

  return {
    members,
    getGroupMembers,
  };
};

export default useGroupMembers;
