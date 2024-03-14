import React, { useMemo } from "react";

import Typography from "components/Typography";
import { useUserProfile } from "context/userProfile/useUserProfile";

const PositionInfo = ({ membersList }) => {
  const { user } = useUserProfile();

  const { rank, percent } = useMemo(() => {
    const foundIndex = membersList.findIndex(
      (member) => member.id === user.uid
    );
    if (membersList.length === 1 || membersList[foundIndex]?.score === 0) {
      return {
        rank: null,
      };
    }
    const rank = foundIndex + 1;
    return {
      rank,
      percent: Math.round(
        ((membersList.length - rank) / (membersList.length)) * 100
      ),
    };
  }, [membersList, user.uid]);

  return (
    <div className="p-3 bg-info rounded-xl flex items-center gap-5">
      {rank ? (
        <>
          <div className="bg-secondary rounded-xl flex justify-center items-center p-2 text-xl">
            #{rank}
          </div>
          <Typography>
            You are doing better than {percent}% of your friends
          </Typography>
        </>
      ) : (
        <Typography className="mx-auto">You are not ranked!</Typography>
      )}
    </div>
  );
};

export default PositionInfo;
