import React from "react";

import Typography from "components/Typography";

const NoData = ({ children, ...rest }) => {
  return <Typography {...rest}>{children || "No Data!"}</Typography>;
};

export default NoData;
