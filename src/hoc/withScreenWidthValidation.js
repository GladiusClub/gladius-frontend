import React, { useEffect, useState } from "react";
import { debounce } from "lodash";

const LARGE_SCREEN_WIDTH = 900;

const withScreenWidthValidation = (WrappedComponent) => {
  return (props) => {
    const [isLargeScreen, setIsLargeScreen] = useState(
      window.innerWidth > LARGE_SCREEN_WIDTH
    );

    useEffect(() => {
      window.addEventListener("resize", debounce(handleResize, 500));
      return () => {
        window.removeEventListener("resize", this.handleResize);
      };
    }, []);

    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > LARGE_SCREEN_WIDTH);
    };

    if (isLargeScreen) {
      return (
        <div className="flex justify-center items-center h-full text-3xl">
          <p>This app is not yet supported for larger screens!</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withScreenWidthValidation;
