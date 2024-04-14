import React from "react";
import classNames from "classnames";

import useCopyToClipboard from "./useCopyToClipboard";

const CopyToClipboard = ({ text, className }) => {
  const { title, disabled, success, error, onCopyClicked } =
    useCopyToClipboard();

  return (
    <button
      className={classNames(className, {
        "text-success": success,
        "text-info": error,
      })}
      disabled={disabled}
      onClick={() => onCopyClicked(text)}
    >
      {title}
    </button>
  );
};

export default CopyToClipboard;
