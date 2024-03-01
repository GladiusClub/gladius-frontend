import React from "react";
import classNames from "classnames";

import List from "components/List";
import ListItem from "components/List/ListItem";
import NonPerformerListItem from "./NonPerformerListItem";

const NonPerformers = ({ nonPerformers }) => {
  return (
    <List className="mt-10">
      {nonPerformers.map((item, index) => (
        <ListItem
          key={item.name}
          className={classNames(
            "bg-dark border border-primary my-3 rounded-xl",
            {
              "bg-active": item.active,
            }
          )}
          hideDivider
        >
          <NonPerformerListItem item={item} rank={index + 4} />
        </ListItem>
      ))}
    </List>
  );
};

export default NonPerformers;
