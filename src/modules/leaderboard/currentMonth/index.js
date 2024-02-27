import React from "react";

import Performers from "./Performers";
import PositionInfo from "./PositionInfo";

const data = [
  {
    name: "Tomis Doe",
    points: 3100,
    avatar: "https://ui-avatars.com/api/?name=Tomis+Doe",
  },
  {
    name: "Alice Smith",
    points: 4500,
    avatar: "https://ui-avatars.com/api/?name=Alice+Smith",
    active: true,
  },
  {
    name: "Bob Johnson",
    points: 2800,
    avatar: "https://ui-avatars.com/api/?name=Bob+Johnson",
  },
  {
    name: "Charlie Brown",
    points: 3800,
    avatar: "https://ui-avatars.com/api/?name=Charlie+Brown",
  },
  {
    name: "David Lee",
    points: 2200,
    avatar: "https://ui-avatars.com/api/?name=David+Lee",
  },
  {
    name: "Eva Wilson",
    points: 4900,
    avatar: "https://ui-avatars.com/api/?name=Eva+Wilson",
  },
  {
    name: "Frank Anderson",
    points: 3700,
    avatar: "https://ui-avatars.com/api/?name=Frank+Anderson",
  },
  {
    name: "Grace Taylor",
    points: 5100,
    avatar: "https://ui-avatars.com/api/?name=Grace+Taylor",
  },
  {
    name: "Helen Clark",
    points: 4100,
    avatar: "https://ui-avatars.com/api/?name=Helen+Clark",
  },
  {
    name: "Ivan White",
    points: 5200,
    avatar: "https://ui-avatars.com/api/?name=Ivan+White",
  },
  {
    name: "Julia Walker",
    points: 2800,
    avatar: "https://ui-avatars.com/api/?name=Julia+Walker",
  },
  {
    name: "Mia Hall",
    points: 3700,
    avatar: "https://ui-avatars.com/api/?name=Mia+Hall",
  },
  {
    name: "Oliver Young",
    points: 4400,
    avatar: "https://ui-avatars.com/api/?name=Oliver+Young",
  },
  {
    name: "Sophia Allen",
    points: 3900,
    avatar: "https://ui-avatars.com/api/?name=Sophia+Allen",
  },
  {
    name: "William King",
    points: 4800,
    avatar: "https://ui-avatars.com/api/?name=William+King",
  },
];

data.sort((a, b) => b.points - a.points);

const CurrentMonth = () => {
  const performers = data.slice(0,3);
  return (
    <div className="mt-10">
      <PositionInfo />
      <Performers performers={performers} />
    </div>
  );
};

export default CurrentMonth;
