const rootElement = document.getElementById("root");

export const popupTheme = {
  MuiPaper: {
    styleOverrides: {
      root: {
        color: "var(--color-default)",
        background: "var(--color-gradient-body)",
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
};
