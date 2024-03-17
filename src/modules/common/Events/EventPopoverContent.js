import React from "react";
import dayjs from "dayjs";
import Box from "@mui/material/Box";

import Typography from "components/Typography";
import { PopoverClose, PopoverContent } from "components/Popover";
import Divider from "components/Divider";

const EventPopoverContent = ({ content }) => {
  return (
    <PopoverContent
      origin={{
        anchorOrigin: {
          vertical: "center",
          horizontal: "center",
        },
        transformOrigin: {
          vertical: "center",
          horizontal: "center",
        },
      }}
    >
      <Box className="p-8">
        <Typography className="text-lg font-semibold text-primary">
          {content.summary}
        </Typography>
        <Typography className="text-sm">{content.description}</Typography>
        <Divider className="my-5" />
        <div className="text-sm">
          <Typography className="grid grid-cols-2 my-3">
            <Typography variant="span" className="text-primary w-10">
              Location:
            </Typography>
            <Typography variant="span">{content.location || "NA"}</Typography>
          </Typography>
          <Typography className="grid grid-cols-2 my-3">
            <Typography variant="span" className="text-primary">
              Address:
            </Typography>
            <Typography variant="span">{content.address || "NA"}</Typography>
          </Typography>
          <Typography className="grid grid-cols-2 my-3">
            <Typography variant="span" className="text-primary">
              Date:
            </Typography>
            <Typography variant="span">
              {content.date ? dayjs(content.date).format("MMMM D, YYYY") : "NA"}
            </Typography>
          </Typography>
          <Typography className="grid grid-cols-2 my-3">
            <Typography variant="span" className="text-primary">
              Time:
            </Typography>
            <Typography variant="span">{content.startTime || "NA"}</Typography>
          </Typography>
          <Typography className="grid grid-cols-2 my-3">
            <Typography variant="span" className="text-primary">
              Reward:
            </Typography>
            <Typography variant="span" className="text-secondary">
              {content.score || "NA"}
            </Typography>
          </Typography>
        </div>
        <div className="flex justify-end">
          <PopoverClose>
            <button className="text-secondary text-sm text-right">Close</button>
          </PopoverClose>
        </div>
      </Box>
    </PopoverContent>
  );
};

export default EventPopoverContent;
