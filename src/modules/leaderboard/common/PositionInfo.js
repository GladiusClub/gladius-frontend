import React, { useMemo } from "react";

import Typography from "components/Typography";
import { useUserProfile } from "context/userProfile/useUserProfile";

const PositionInfo = ({ membersList }) => {
  const { user } = useUserProfile();

  const { rank, percent } = useMemo(() => {
    const rank = membersList.findIndex((member) => member.id === user.uid) + 1;
    return {
      rank,
      percent: Math.round((1 - rank / membersList.length) * 100),
    };
  }, [membersList, user.uid]);

  return (
    <div className="p-3 bg-info rounded-xl flex items-center gap-5">
      <div className="bg-secondary rounded-xl flex justify-center items-center p-2 text-xl">
        #{rank}
      </div>
      <Typography>
        You are doing better than {percent}% of your friends
      </Typography>
    </div>
  );
};

export default PositionInfo;
