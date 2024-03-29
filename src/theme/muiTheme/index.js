import { calendarTheme } from "./calendar";
import { iconTheme } from "./icon";
import { popupTheme } from "./popup";
import { spinnerTheme } from "./spinner";

export const muiTheme = {
  components: {
    ...calendarTheme,
    ...iconTheme,
    ...popupTheme,
    ...spinnerTheme,
  },
};
