import React, { cloneElement } from "react";
import classNames from "classnames";

const TabsList = ({
  className,
  classes,
  activeIndex,
  children,
  onTabChange,
}) => {
  const widthPercentage = `${100 / children.length}%`;

  return (
    <div
      className={classNames(
        className,
        "flex text-default w-full p-1 rounded-xl"
      )}
    >
      {children.map((child, index) => {
        return cloneElement(child, {
          key: child.props.label,
          active: index === activeIndex,
          classes,
          style: { width: widthPercentage },
          onClick: () => onTabChange(index),
        });
      })}
    </div>
  );
};

export default TabsList;
