import React from "react";
import classNames from "classnames";

import List from "components/List";
import ListItem from "components/List/ListItem";
import NonPerformerListItem from "./NonPerformerListItem";
import useUserProfile from "context/userProfile/useUserProfile";

const NonPerformers = ({ nonPerformers }) => {
  const { user } = useUserProfile();

  return (
    <List className="mt-10">
      {nonPerformers.map((item, index) => (
        <ListItem
          key={item.name}
          className={classNames(
            "bg-dark border border-primary my-3 rounded-xl",
            {
              "bg-gradient-active": user.uid === item.id,
            },
          )}
          hideDivider
        >
          <NonPerformerListItem userId={user.uid} item={item} rank={index + 4} />
        </ListItem>
      ))}
    </List>
  );
};

export default NonPerformers;
