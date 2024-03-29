import colors from "theme/colors";

const rootElement = document.getElementById("root");

export const popupTheme = {
  MuiPaper: {
    styleOverrides: {
      root: {
        color: colors.default,
        background: colors["gradient-body"],
        borderRadius: "2rem",
      },
    },
  },
  MuiPopover: {
    defaultProps: {
      container: rootElement,
    },
  },
  MuiPopper: {
    defaultProps: {
      container: rootElement,
    },
  },
  MuiDialog: {
    defaultProps: {
      container: rootElement,
    },
  },
  MuiModal: {
    defaultProps: {
      container: rootElement,
    },
  },
  MuiBackdrop: {
    styleOverrides: {
      root: {
        backgroundColor: colors["dark"],
        opacity: "0.5 !important",
      },
    },
  },
};
