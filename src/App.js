import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Game from "./Game";
import Home from "./Home";

library.add(fas);
function App() {
  return (
    <div className="App">
      <Router>
        {/* All routes are nested inside it */}
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/game" element={<Game />}></Route>
        </Routes>
      </Router>
      ;
    </div>
  );
}

export default App;
