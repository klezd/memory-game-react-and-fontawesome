import "./App.css";
import Typography from "@mui/material/Typography";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import Game from "./Game";

library.add(fas);
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography
          variant="h2"
          sx={{
            color: "white",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontSize: "1.8em",
          }}
        >
          Memory game
        </Typography>
      </header>
      <Game />
    </div>
  );
}

export default App;
