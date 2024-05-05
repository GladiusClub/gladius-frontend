/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import CircularProgress from "@mui/material/CircularProgress";

import Typography from "components/Typography";
import { fetchGlcBalance } from "api/stellarWallet";
import useUserProfile from "context/userProfile/useUserProfile";
import EventBus from "helpers/EventBus";
import { busEvents } from "constants/busEvents";

const PointsInfo = () => {
  const [pointsBalance, setPointsBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const {
    user: { uid },
  } = useUserProfile();

  const getGlcBalance = useCallback(() => {
    setLoading(true);
    fetchGlcBalance(uid)
      .then((response) => {
        // Assuming the response contains the points balance
        setPointsBalance(response.data != null ? response.data : 0);
      })
      .catch((error) => {
        console.error("Error fetching GLC balance:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [uid]);

  useEffect(() => {
    getGlcBalance();

    EventBus.subscribe(busEvents.sendBalanceSuccess, getGlcBalance);

    return () => {
      EventBus.unsubscribe(busEvents.sendBalanceSuccess, getGlcBalance);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center item-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex items-center flex-col">
      <Typography className="text-lg">GLC balance</Typography>
      <Typography className="text-4xl text-secondary mt-1">
        {pointsBalance}
      </Typography>
      <Typography className="flex text-success items-center">
        <IoMdArrowDropup className="w-7 h-7" />
        <Typography variant="span" className="text-sm ">
          {pointsBalance} GLC last week
        </Typography>
      </Typography>
    </div>
  );
};

export default PointsInfo;
