import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./components/homepage/Home";

function App() {
  return (
    <BrowserRouter basename="/">
      <Home />
    </BrowserRouter>
  );
}

export default App;
