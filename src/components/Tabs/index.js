import React, { useState } from "react";
import classNames from "classnames";
import TabContent from "./TabContent";
import TabsList from "./TabsList";
import "./tabs.css";

const Tabs = ({ className, classes, children, useLazyLoad = true }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <TabsList
        className={`tabs ${className}`}
        activeIndex={activeIndex}
        onTabChange={setActiveIndex}
        classes={classes}
      >
        {children}
      </TabsList>
      {useLazyLoad ? (
        <TabContent>{children[activeIndex]?.props.children}</TabContent>
      ) : (
        children.map((child, index) => (
          <TabContent
            className={classNames({
              hidden: index !== activeIndex,
            })}
            key={index}
          >
            {child.props.children}
          </TabContent>
        ))
      )}
    </>
  );
};

export default Tabs;
