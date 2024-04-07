/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "services/firebase/firebase-config";
import { clear, setItem } from "helpers/localStorageHelper";
import { localStorageKeys } from "constants/storage";

export const UserProfileContext = createContext({});

export const UserProfileProvider = ({ children }) => {
  const [user, setUser] = useState({ isFetching: true });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          isFetching: false,
          uid: user.uid,
          club: null,
        });
      } else {
        setUser({ isFetching: false });
        clear();
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user.email) {
      setItem(localStorageKeys.user, user);
    }
  }, [user]);

  return (
    <UserProfileContext.Provider value={{ user, setUser }}>
      {children}
    </UserProfileContext.Provider>
  );
};
