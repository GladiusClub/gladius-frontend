import React, { useState } from "react";

import SwitchButton from "./SwitchButton";
import "./switch.css";
import { isDefined } from "utils/commonUtils";

const BinarySwitch = ({ value, onSwitchClick, disabled }) => {
  const [isTrue, setIsTrue] = useState(value);

  const handleSwitchClick = (e) => {
    e.stopPropagation();
    if (disabled) {
      return;
    }
    const { value } = e.target.dataset;
    const newState = value === "yes";
    setIsTrue(newState);
    onSwitchClick(newState);
  };

  return (
    <div
      className="flex w-2/5 text-sm"
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
