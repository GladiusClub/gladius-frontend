import React from "react";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { IoCloseSharp } from "react-icons/io5";

import Typography from "components/Typography";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTarget,
} from "components/Popover";

const SelectedDate = ({ date, onPrevClick, onNextClick, onDateChange }) => {
  const handleChange = (e) => {
    onDateChange(e.$d);
  };

  return (
    <div className="flex justify-between items-center">
      <button onClick={onPrevClick}>
        <MdOutlineArrowBackIos className="text-lg" />
      </button>
      <div className="flex flex-col items-center">
        <Popover>
          <PopoverTarget>
            <Typography variant="span" className="text-xl" role="button">
              {date.toLocaleDateString()}
            </Typography>
          </PopoverTarget>
          <PopoverContent>
            <Box>
              <div className="flex justify-end mr-5 mt-5">
                <PopoverClose>
                  <button className="text-xl">
                    <IoCloseSharp />
                  </button>
                </PopoverClose>
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar value={dayjs(date)} onChange={handleChange} />
              </LocalizationProvider>
            </Box>
          </PopoverContent>
        </Popover>
        <Typography variant="span" className="text-neutral text-sm">
          No events
        </Typography>
      </div>
      <button onClick={onNextClick}>
        <MdOutlineArrowForwardIos className="text-lg" />
      </button>
    </div>
  );
};

export default SelectedDate;
