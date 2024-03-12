import colors from 'theme/colors';

const rootElement = document.getElementById("root");

export const popupTheme = {
  MuiPaper: {
    styleOverrides: {
      root: {
        color: colors.default,
        background: colors['gradient-body'],
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
