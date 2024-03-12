import { useState } from "react";

import { useFirebase } from "services/firebase/useFirebase";
import { fetchMembersList } from "api/clubApi";

const useClub = () => {
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

  const getMembersList = async (clubId, fromDate) => {
    setMembers((prev) => ({ ...prev, loading: true }));
    try {
      const data = await fetchMembersList(clubId, fromDate);
      setMembers({ data, error: null, loading: false });
    } catch (err) {
      console.error("Error getting members list", err);
      handleFailure(err);
      setMembers({ data: [], error: err.message, loading: false });
    }
  };

  return {
    members,
    getMembersList,
  };
};

export default useClub;
