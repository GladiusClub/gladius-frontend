import React from "react";

import SinglePerformer from "./SinglePerformer";

const Performers = ({ performers }) => {
  const [first, second, third] = performers;
  return (
    <div className="flex justify-center gap-1 mt-10">
      {second && <SinglePerformer performer={second} position={2} />}
      {first && <SinglePerformer performer={first} position={1} />}
      {third && <SinglePerformer performer={third} position={3} />}
    </div>
  );
};

export default Performers;
