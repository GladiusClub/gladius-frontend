/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import useFirebase from "services/firebase/useFirebase";
import { fetchClubs, fetchGroups } from "api/clubsAndGroupsApi";

const useClubsAndGroups = (clubId) => {
  const { checkForNavigateToSignIn } = useFirebase();

  const [clubs, setClubs] = useState({
    data: [],
    loading: false,
    error: null,
  });

  const [groups, setGroups] = useState({
    data: [],
    loading: false,
    error: null,
  });

  const handleFailure = (err) => {
    console.error(err);
    checkForNavigateToSignIn(err.code);
  };

  const getClubs = async () => {
    setClubs((prev) => ({ ...prev, loading: true }));
    try {
      const data = await fetchClubs();
      setClubs({ data, error: null, loading: false });
    } catch (err) {
      console.error("Error getting clubs list");
      handleFailure(err);
      setClubs({ data: [], error: err.message, loading: false });
    }
  };

  const getgroups = async (clubId) => {
    setGroups((prev) => ({ ...prev, loading: true }));
    try {
      const data = await fetchGroups(clubId);
      setGroups({ data, error: null, loading: false });
    } catch (err) {
      console.error("Error getting groups list");
      handleFailure(err);
      setGroups({ data: [], error: err.message, loading: false });
    }
  };

  useEffect(() => {
    getClubs();
  }, []);

  useEffect(() => {
    if (clubId) {
      getgroups(clubId);
    }
  }, [clubId]);

  return {
    clubs,
    groups,
  };
};

export default useClubsAndGroups;
