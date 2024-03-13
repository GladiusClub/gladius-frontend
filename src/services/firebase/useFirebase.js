import _ from "lodash";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "services/firebase/firebase-config";
import { getItem } from "helpers/localStorageHelper";
import { authMessages } from "constants/auth";
import { unProtectedRoutes } from "constants/routes";

export const useFirebase = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const checkForNavigateToSignIn = (code) => {
    if (code === "auth/token-expired" || code === "permission-denied") {
      navigate(unProtectedRoutes.signIn, {
        state: { from: location },
        replace: true,
      });
    }
  };

  const getDataFromDoc = (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      setData(data);
      setError(null);
      return data;
    } else {
      console.error("No such document!");
      throw new Error("Failed to get data!");
    }
  };

  const handleFailure = (err) => {
    console.error(err);
    checkForNavigateToSignIn(err.code);
    setError(err.message);
    setData(null);
  };

  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setError(null);
      return response;
    } catch (err) {
      setError(authMessages[err.code] || err.message);
    } finally {
      setLoading(false);
    }
  };

  const signUpUser = async (email, password) => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setError(null);
      return response;
    } catch (err) {
      setError(authMessages[err.code] || err.message);
    } finally {
      setLoading(false);
    }
  };

  const getDocDataByUid = async (
    collection,
    uid,
    key = null,
    cb = _.noop
  ) => {
    if (key) {
      const item = getItem(key);
      if (item) {
        cb(item);
      }
    }
    setLoading(true);
    try {
      const docRef = doc(db, collection, uid);
      const record = await getDoc(docRef);
      return getDataFromDoc(record);
    } catch (err) {
      handleFailure(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    firebaseError: error,
    checkForNavigateToSignIn,
    signInUser,
    signUpUser,
    getDocDataByUid,
  };
};
