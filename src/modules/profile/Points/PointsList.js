import React, { useState } from "react";
import { Button } from "@mui/material";

import Typography from "components/Typography";
import List from "components/List";
import NoData from "components/NoData";
import PointsListItem from "./PointsListItem";
import ListItem from "components/List/ListItem";

const PointsList = ({ title, list }) => {
  const [listToShow, setListToShow] = useState(list.slice(0, 5));

  const handleShowAllClick = () => {
    setListToShow(list);
  };

  return (
    <section className="mt-10">
      <Typography className="text-xl text-primary">{title}</Typography>
      {list.length > 0 ? (
        <>
          <List>
            {listToShow.map((event) => (
              <ListItem key={`${event.summary}-${event.date}`}>
                <PointsListItem item={event} />
              </ListItem>
            ))}
          </List>
          {listToShow.length < list.length && (
            <Button
              variant="outlined"
              className="font-manrope text-default text-sm normal-case border-primary mt-5 rounded-lg"
              onClick={handleShowAllClick}
            >
              Show All
            </Button>
          )}
        </>
      ) : (
        <NoData className="mt-5 text-lg text-center" />
      )}
    </section>
  );
};

export default PointsList;
