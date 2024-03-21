import React from "react";

import Divider from "components/Divider";

const ListItem = ({ children, hideDivider, ...rest }) => {
  return (
    <li {...rest}>
      {children}
      {!hideDivider && <Divider />}
    </li>
  );
};

export default ListItem;
