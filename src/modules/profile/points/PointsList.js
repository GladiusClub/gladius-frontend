import React from "react";

import Typography from "components/Typography";
import List from "components/List";
import PointsListItem from "./PointsListItem";
import ListItem from "components/List/ListItem";

const PointsList = ({ title, list }) => {
  return (
    <section className="mt-10">
      <Typography className="text-xl text-primary">{title}</Typography>
      <List>
        {list.map((event) => (
          <ListItem key={event.eventName}>
            <PointsListItem item={event} />
          </ListItem>
        ))}
      </List>
    </section>
  );
};

export default PointsList;
