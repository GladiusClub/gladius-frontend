/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import fetchGlcBalance from "api/glcBalance";
import useUserProfile from "context/userProfile/useUserProfile";

import Typography from "components/Typography";
import EventBus from "helpers/EventBus";
import { busEvents } from "constants/busEvents";

const PointsInfo = () => {
  const [pointsBalance, setPointsBalance] = useState(0);

  const {
    user: { uid },
  } = useUserProfile();

  const getGlcBalance = useCallback(() => {
    fetchGlcBalance(uid)
      .then((response) => {
        // Assuming the response contains the points balance
        setPointsBalance(response.data != null ? response.data : 0);
      })
      .catch((error) => {
        console.error("Error fetching GLC balance:", error);
      });
  }, [uid]);

  useEffect(() => {
    getGlcBalance();
  }, [pointsBalance, uid, setPointsBalance]);

  useEffect(() => {
    EventBus.subscribe(busEvents.sendBalanceSuccess, getGlcBalance);

    return () => {
      EventBus.unsubscribe(busEvents.sendBalanceSuccess, getGlcBalance);
    };
  }, []);

  return (
    <div className="flex items-center flex-col">
      <Typography className="text-lg">GLC balance</Typography>
      <Typography className="text-4xl text-secondary mt-1">
        {pointsBalance}
      </Typography>
      <Typography className="flex text-success items-center">
        <IoMdArrowDropup className="w-7 h-7" />
        <Typography variant="span" className="text-sm ">
          {pointsBalance} points last week
        </Typography>
      </Typography>
    </div>
  );
};

export default PointsInfo;
