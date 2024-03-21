import React from "react";

import Typography from "components/Typography";
import Image from "components/Image";

const BadgeCard = ({ item }) => {
  return (
    <div className="relative">
      <Image
        src={item.image}
        alt={item.name}
        className="rounded-lg w-full"
        loaderClassName="h-[10rem]"
      />
      <div className="bg-dark opacity-70 absolute p-4 bottom-0 rounded-b-lg w-full">
        <Typography className="truncate">{item.name}</Typography>
        <div className="flex justify-between items-center mt-2">
          <Typography variant="span" className="text-neutral text-sm">
            #{item.id}
          </Typography>
          <Typography variant="span" className="text-secondary text-sm">
            {item.points} points
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default BadgeCard;
