import React, { Suspense } from "react";
import classNames from "classnames";

import Loader from "components/Loader";

const TabContent = ({ children, className, ...rest }) => {
  return (
    <Suspense fallback={<Loader className="mt-10 text-center" />}>
      <div className={classNames("tab-content", className)} {...rest}>
        {children}
      </div>
    </Suspense>
  );
};

export default TabContent;
