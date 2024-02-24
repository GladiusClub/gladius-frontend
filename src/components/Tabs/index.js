import React, { useState } from "react";
import TabContent from "./TabContent";
import TabsList from "./TabsList";
import "./tabs.css";

const Tabs = ({ className, children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div className={`tabs ${className}`}>
        <TabsList activeIndex={activeIndex} onTabChange={setActiveIndex}>
          {children}
        </TabsList>
      </div>
      <TabContent>{children[activeIndex]?.props.children}</TabContent>
    </>
  );
};

export default Tabs;
