import { BrowserRouter } from "react-router-dom";

import Main from "./pages/Main";
import { UserProfileProvider } from "context/UserProfileContext";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <UserProfileProvider>
        <Main />
      </UserProfileProvider>
    </BrowserRouter>
  );
}

export default App;
