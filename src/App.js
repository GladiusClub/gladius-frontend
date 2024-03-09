import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Main from "./pages/Main";
import { UserProfileProvider } from "context/userProfile/UserProfileContext";
import { muiTheme } from "theme/muiTheme";
import "./App.css";

const theme = createTheme(muiTheme);

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
