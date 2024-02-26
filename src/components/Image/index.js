/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import classNames from "classnames";

import Loader from "components/Loader";

const Image = ({ className, loaderClassName, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <img
        {...rest}
        onLoad={handleLoadComplete}
        className={classNames(className, {
          hidden: isLoading,
        })}
      />
      <Loader
        className={classNames(loaderClassName, "flex justify-center", {
          hidden: !isLoading,
        })}
      />
    </>
  );
};

export default Image;
