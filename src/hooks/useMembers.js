import { useState } from "react";

import useFirebase from "services/firebase/useFirebase";
import useUserProfile from "context/userProfile/useUserProfile";
import { fetchMembers } from "api/membersApi";

const useMembers = () => {
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

  const getMembers = async (dates) => {
    setMembers((prev) => ({ ...prev, loading: true }));
    try {
      const data = await fetchMembers({
        ...dates,
        uid: user.uid,
        clubId: user.clubId,
      });
      setMembers({ data, error: null, loading: false });
    } catch (err) {
      console.error("Error getting members list");
      handleFailure(err);
      setMembers({ data: [], error: err.message, loading: false });
    }
  };

  return {
    members,
    getMembers,
  };
};

export default useMembers;
