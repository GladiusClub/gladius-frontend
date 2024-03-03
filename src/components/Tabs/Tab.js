import React from "react";
import classNames from "classnames";

const Tab = ({ label, active, className, classes, ...rest }) => {
  return (
    <button
      className={classNames(
        className,
        "tab py-1 text-center rounded-lg",
        {
          [`${classes?.active} active`]: active,
          [classes?.default]: !active,
        }
      )}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Tab;
