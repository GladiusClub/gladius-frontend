import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";

import ErrorBoundary from "components/ErrorBoundary.js";
import withScreenWidthValidation from "hoc/withScreenWidthValidation";
import { UserProfileProvider } from "context/userProfile/UserProfileContext";
import { muiTheme } from "theme/muiTheme";
import Main from "./pages/Main";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const theme = createTheme(muiTheme);

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <UserProfileProvider>
            <Main />
            <ToastContainer
              theme="colored"
              position="top-center"
              autoClose={2000}
            />
          </UserProfileProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default withScreenWidthValidation(App);
