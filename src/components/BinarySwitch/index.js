import React, { useState } from "react";
import classNames from "classnames";

import SwitchButton from "./SwitchButton";
import "./switch.css";
import { isDefined } from "utils/commonUtils";

const BinarySwitch = ({ value, onSwitchClick, disabled }) => {
  const [isTrue, setIsTrue] = useState(value);

  const handleSwitchClick = (e) => {
    const { value } = e.target.dataset;
    const newState = value === "yes";
    setIsTrue(newState);
    onSwitchClick(newState);
  };

  return (
    <div
      className={classNames("flex w-2/5 cursor-pointer text-sm", {
        "pointer-events-none": disabled,
      })}
      role="button"
      onClick={handleSwitchClick}
    >
      <SwitchButton
        className="rounded-l-3xl"
        data-value="no"
        active={isDefined(isTrue) && !isTrue}
      >
        No
      </SwitchButton>
      <span className="w-[1px] bg-neutral"></span>
      <SwitchButton className="rounded-r-3xl" data-value="yes" active={isTrue}>
        Yes
      </SwitchButton>
    </div>
  );
};

export default BinarySwitch;
