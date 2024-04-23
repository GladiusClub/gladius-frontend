import { useState } from "react";

import { makeClubPayment } from "api/stellarWallet";

const useStellarWallet = () => {
  const [stellarWallet, setStellarWallet] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const createStellarWallet = async (apiData) => {
    setStellarWallet((prev) => ({ ...prev, loading: true }));
    try {
      const data = await makeClubPayment(apiData);
      setStellarWallet({ data, error: null, loading: false });
      return data;
    } catch (err) {
      console.error("Error creating stellar wallet");
      console.error(err);
      setStellarWallet({ data: [], error: err.message, loading: false });
    }
  };

  return {
    stellarWallet,
    createStellarWallet,
  };
};

export default useStellarWallet;
