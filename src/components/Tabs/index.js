import React, { useState } from "react";
import TabContent from "./TabContent";
import TabsList from "./TabsList";
import "./tabs.css";

const Tabs = ({ className, classes, children }) => {
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
      <TabContent>{children[activeIndex]?.props.children}</TabContent>
    </>
  );
};

export default Tabs;
