/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "services/firebase-config";
import { collections } from "constants/collections";

export const UserProfileContext = createContext({});

export const UserProfileProvider = ({ children }) => {
  const [user, setUser] = useState({ isFetching: true });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ isFetching: false, email: user.email });
        fetchUserByUid(user.uid);
      } else {
        setUser({ isFetching: false });
      }
    });

    return unsubscribe;
  }, []);

  const fetchUserByUid = async (uid) => {
    const userRef = doc(db, collections.users, uid);
    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setUser((prev) => ({ ...prev, ...userDoc.data() }));
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting user document:", error);
    }
  };

  return (
    <UserProfileContext.Provider value={{ user }}>
      {children}
    </UserProfileContext.Provider>
  );
};
