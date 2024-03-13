import { useState } from "react";

import { useUserProfile } from "context/userProfile/useUserProfile";
import { useFirebase } from "services/firebase/useFirebase";
import { fetchMembers } from "api/clubApi";

const useClub = () => {
  const { user } = useUserProfile();
  const { checkForNavigateToSignIn } = useFirebase();

  const [members, setMembers] = useState({
    data: [],
    loading: false,
    error: null,
  });

  const handleFailure = (err) => {
    console.error(err);
    checkForNavigateToSignIn(err.code);
  };

  const getMembers = async (fromDate) => {
    setMembers((prev) => ({ ...prev, loading: true }));
    try {
      const data = await fetchMembers(user.uid, user.clubId, fromDate);
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

export default useClub;
