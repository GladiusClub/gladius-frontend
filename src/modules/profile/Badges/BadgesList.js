import React from "react";

import List from "components/List";
import ListItem from "components/List/ListItem";
import BadgeCard from "./BadgeCard";

const BadgesList = ({ badges }) => {
  return (
    <List className="grid grid-cols-2 gap-4 mt-10">
      {badges.map((badge) => (
        <ListItem key={badge.name} hideDivider>
          <BadgeCard item={badge} />
        </ListItem>
      ))}
    </List>
  );
};

export default BadgesList;
