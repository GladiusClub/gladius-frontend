/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "services/firebase-config";
import { useFirebase } from "services/useFirebase";
import { collections } from "constants/collections";

export const UserProfileContext = createContext({});

export const UserProfileProvider = ({ children }) => {
  const [user, setUser] = useState({ isFetching: true });
  const { data, getDocDataByUid } = useFirebase();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ isFetching: false, email: user.email });
        getDocDataByUid(collections.users, user.uid);
      } else {
        setUser({ isFetching: false });
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    setUser((prev) => ({ ...prev, ...data }));
  }, [data]);

  return (
    <UserProfileContext.Provider value={{ user }}>
      {children}
    </UserProfileContext.Provider>
  );
};
