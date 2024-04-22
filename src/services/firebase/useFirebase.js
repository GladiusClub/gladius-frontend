import _ from "lodash";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, addDoc, collection, updateDoc, getDocs } from "firebase/firestore";

import { auth, db } from "services/firebase/firebase-config";
import { getItem } from "helpers/localStorageHelper";
import { authMessages } from "constants/auth";
import { unProtectedRoutes } from "constants/routes";

const useFirebase = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const checkForNavigateToSignIn = (code) => {
    if (code === "auth/token-expired") {
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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setError(null);
      return true;
    } catch (err) {
      setError(authMessages[err.code] || err.message);
    } finally {
      setLoading(false);
    }
  };

  const getDocDataById = async (collection, id, key = null, cb = _.noop) => {
    if (key) {
      const item = getItem(key);
      if (item) {
        cb(item);
      }
    }
    setLoading(true);
    try {
      const docRef = doc(db, collection, id);
      const record = await getDoc(docRef);
      return getDataFromDoc(record);
    } catch (err) {
      handleFailure(err);
    } finally {
      setLoading(false);
    }
  };

  const getDocsFromCollection = async (collectionPath) => {
    setLoading(true);
    try {
      const collectionRef = collection(db, collectionPath);
      const docs = await getDocs(collectionRef);
      setError(null);
      return docs;
    } catch (err) {
      handleFailure(err);
    } finally {
      setLoading(false);
    }
  };

  const addDocData = async (collectionPath, data) => {
    setLoading(true);
    try {
      const collectionRef = collection(db, collectionPath);
      await addDoc(collectionRef, data);
      setError(null);
    } catch (err) {
      handleFailure(err);
    } finally {
      setLoading(false);
    }
  };

  const updateDocData = async (collectionPath, id, data) => {
    setLoading(true);
    try {
      const docRef = doc(db, collectionPath, id);
      await updateDoc(docRef, data);
      setError(null);
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
    resetPassword,
    getDocDataById,
    getDocsFromCollection,
    addDocData,
    updateDocData,
  };
};

export default useFirebase;
