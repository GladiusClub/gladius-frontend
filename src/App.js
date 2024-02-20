import { BrowserRouter } from "react-router-dom";

import Main from "./pages/Main";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
