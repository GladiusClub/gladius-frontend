import React from "react";
import classNames from "classnames";

const SwitchButton = ({ active, className, children, ...rest }) => {
  return (
    <button
      className={classNames("py-2 w-1/2 switch", className, {
        "bg-gradient-active pointer-events-none active": active,
        "bg-dark text-neutral": !active,
      })}
      {...rest}
    >
      {children}
    </button>
  );
};

export default SwitchButton;
