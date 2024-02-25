import React from "react";

const List = ({ children, ...rest }) => {
  return <ul {...rest}>{children}</ul>;
};

export default List;
