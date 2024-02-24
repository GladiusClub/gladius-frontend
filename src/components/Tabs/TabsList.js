import React, { cloneElement } from "react";

const TabsList = ({ children, activeIndex, onTabChange }) => {
  return (
    <div className="tabs-list flex text-default w-full bg-dark p-1 rounded-xl">
      {children.map((child, index) => {
        if (child.type.name === "Tab") {
          return cloneElement(child, {
            active: index === activeIndex,
            onClick: () => onTabChange(index),
            key: child.props.label
          });
        }
        return null;
      })}
    </div>
  );
};

export default TabsList;
