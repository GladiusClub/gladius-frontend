import { useState } from "react";

import useFirebase from "services/firebase/useFirebase";
import useUserProfile from "context/userProfile/useUserProfile";
import { fetchClubMembers } from "api/membersApi";

const useClubMembers = () => {
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

  const getClubMembers = async () => {
    setMembers((prev) => ({ ...prev, loading: true }));
    try {
      const data = await fetchClubMembers(user.club.id);
      setMembers({ data, error: null, loading: false });
    } catch (err) {
      console.error("Error getting club members list");
      handleFailure(err);
      setMembers({ data: [], error: err.message, loading: false });
    }
  };

  return {
    members,
    getClubMembers,
  };
};

export default useClubMembers;
