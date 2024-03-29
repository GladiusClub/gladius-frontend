import React, { cloneElement } from "react";

const List = ({ children, ...rest }) => {
  return (
    <ul {...rest}>
      {children.map((child, index) => {
        return cloneElement(child, {
          hideDivider: child.props.hideDivider || index === children.length - 1,
        });
      })}
    </ul>
  );
};

export default List;
