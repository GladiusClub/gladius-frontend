import colors from 'theme/colors';

export const calendarTheme = {
  MuiDayCalendar: {
    styleOverrides: {
      root: {
        "& .MuiDayCalendar-weekDayLabel": {
          color: colors.primary,
        },
      },
    },
  },
  MuiPickersDay: {
    styleOverrides: {
      root: {
        color: colors.default,
      },
    },
  },
};
