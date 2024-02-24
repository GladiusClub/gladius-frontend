import React from "react";
import classNames from "classnames";

const Tab = ({ label, active, className, onClick }) => {
  return (
    <button
      className={classNames(
        className,
        "tab py-1 w-1/2 text-center rounded-lg",
        {
          "bg-active active": active,
        }
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Tab;
