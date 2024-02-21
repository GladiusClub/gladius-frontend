import React from "react";

const Loader = ({ className }) => {
  return (
    <div className={`${className || 'flex justify-center items-center'}`}>
      Loading...
    </div>
  );
};

export default Loader;
