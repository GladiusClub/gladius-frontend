import { calendarTheme } from "./calendar";
import { iconTheme } from "./icon";
import { popupTheme } from "./popup";

export const muiTheme = {
  components: {
    ...calendarTheme,
    ...iconTheme,
    ...popupTheme,
  },
};
