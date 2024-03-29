import React from "react";
import classNames from "classnames";

const Loader = ({ className, children, ...rest }) => {
  return (
    <div className={classNames(className)} {...rest}>
      {children || "Loading..."}
    </div>
  );
};

export default Loader;
