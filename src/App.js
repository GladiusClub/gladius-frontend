import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Main from "./pages/Main";
import { UserProfileProvider } from "context/UserProfileContext";
import "./App.css";

const rootElement = document.getElementById("root");

const theme = createTheme({
  components: {
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
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserProfileProvider>
          <Main />
        </UserProfileProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
