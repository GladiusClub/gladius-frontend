import React from "react";

import List from "components/List";
import ListItem from "components/List/ListItem";
import BadgeCard from "./BadgeCard";

const BadgesList = ({ badges }) => {
  return (
    <List className="flex flex-wrap justify-between gap-4 mt-10">
      {badges.map((badge, index) => (
        <ListItem key={`${badge.name}-${index}`} hideDivider>
          <BadgeCard item={badge} />
        </ListItem>
      ))}
    </List>
  );
};

export default BadgesList;
