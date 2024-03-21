import React from "react";
import classNames from "classnames";

import "./divider.css";

const Divider = ({ className }) => {
  return <div className={classNames("divider", className)} />;
};

export default Divider;
