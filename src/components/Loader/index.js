import React from "react";
import classNames from "classnames";

const Loader = ({ className, children }) => {
  return (
    <div className={classNames(className)}>{children || "Loading..."}</div>
  );
};

export default Loader;
