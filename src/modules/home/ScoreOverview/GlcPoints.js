import React, { useState, useCallback, useEffect } from "react";
import { PiCoins } from "react-icons/pi";

import Typography from "components/Typography";
import useUserProfile from "context/userProfile/useUserProfile";
import { fetchGlcBalance } from "api/stellarWallet";

const GlcPoints = () => {
  const [pointsBalance, setPointsBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const {
    user: { uid },
  } = useUserProfile();

  const getGlcBalance = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchGlcBalance(uid);
      setPointsBalance(response?.data || 0);
    } catch (err) {
      console.error("Error fetching GLC balance:", err);
    } finally {
      setLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    getGlcBalance();
  }, [uid, getGlcBalance]);

  if (loading) {
    return (
      <div className="flex justify-center item-center text-xs mt-6">
        Loading GLC points...
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2 justify-center">
        <PiCoins className="text-primary w-7 h-7" />
        <Typography variant="h2" className="text-secondary">
          {pointsBalance.toLocaleString()}
        </Typography>
      </div>
      <Typography className="text-neutral text-sm">
        + {pointsBalance.toLocaleString()} last week
      </Typography>
    </>
  );
};

export default GlcPoints;
