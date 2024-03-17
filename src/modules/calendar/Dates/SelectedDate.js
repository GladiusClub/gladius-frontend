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
import useEventsByDate from "context/EventsByDate/useEventsByDate";
import { getDatesRange, getNextDay, getPrevDay } from "utils/dateUtils";

const SelectedDate = ({ initialDatesOnSilder }) => {
  const {
    datesToSlide,
    activeIndex,
    eventsCount,
    setDatesToSlide,
    setActiveIndex,
  } = useEventsByDate();

  const handlePrevClick = () => {
    if (activeIndex === 0) {
      setDatesToSlide((prev) => [getPrevDay(prev[0]), ...prev]);
      setActiveIndex(0);
    } else {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handleNextClick = () => {
    const lastDateIndex = datesToSlide.length - 1;
    if (activeIndex === lastDateIndex) {
      setDatesToSlide((prev) => [...prev, getNextDay(prev[lastDateIndex])]);
      setActiveIndex(lastDateIndex);
    }
    setActiveIndex((prev) => prev + 1);
  };

  const handleDateChange = (e) => {
    const date = e.$d;
    setDatesToSlide(getDatesRange(initialDatesOnSilder, date));
    setActiveIndex(initialDatesOnSilder);
  };

  return (
    <div className="mt-5 flex justify-between items-center">
      <button onClick={handlePrevClick}>
        <MdOutlineArrowBackIos className="text-lg" />
      </button>
      <div className="flex flex-col items-center">
        <Popover>
          <PopoverTarget>
            <Typography variant="span" className="text-xl" role="button">
              {dayjs(datesToSlide[activeIndex]).format("MMMM D, YYYY")}
            </Typography>
          </PopoverTarget>
          <PopoverContent
            origin={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            }}
          >
            <Box>
              <div className="flex justify-end mr-5 mt-5">
                <PopoverClose>
                  <button className="text-xl">
                    <IoCloseSharp />
                  </button>
                </PopoverClose>
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={dayjs(datesToSlide[activeIndex])}
                  onChange={handleDateChange}
                />
              </LocalizationProvider>
            </Box>
          </PopoverContent>
        </Popover>
        <Typography variant="span" className="text-neutral text-sm">
          {eventsCount ? `You have ${eventsCount} events` : "No events"}
        </Typography>
      </div>
      <button onClick={handleNextClick}>
        <MdOutlineArrowForwardIos className="text-lg" />
      </button>
    </div>
  );
};

export default SelectedDate;
