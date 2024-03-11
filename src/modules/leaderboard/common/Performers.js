import React from "react";

import SinglePerformer from "./SinglePerformer";

const Performers = ({ performers }) => {
  const [first, second, third] = performers;
  return (
    <div className="flex justify-center gap-1 mt-10">
      <SinglePerformer performer={second} position={2} />
      <SinglePerformer performer={first} position={1} />
      <SinglePerformer performer={third} position={3} />
    </div>
  );
};

export default Performers;
