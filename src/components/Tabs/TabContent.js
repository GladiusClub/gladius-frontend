import React, { Suspense } from "react";

import Loader from "components/Loader";

const TabContent = ({ children }) => {
  return (
    <Suspense
      fallback={<Loader className="mt-10 text-center" />}
    >
      <div className="tab-content">{children}</div>
    </Suspense>
  );
};

export default TabContent;
