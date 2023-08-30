import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const newGame = (level) => {
    navigate("/game", { state: { level } });
  };

  return (
    <div className={styles.root}>
      {/*
       * 3 modes: Easy, Medium, Hard
       * Resume game // TODO
       *  */}
      <div>
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
      </div>
      <div className={styles.buttonGroup}>
        <Divider className={styles.title} textAlign="left">
          New Game
        </Divider>
        <Button
          variant="contained"
          className={styles.button}
          onClick={() => newGame("easy")}
        >
          Easy
        </Button>
        <Button
          variant="contained"
          className={styles.button}
          onClick={() => newGame("med")}
        >
          Medium
        </Button>
        <Button
          variant="contained"
          className={styles.button}
          onClick={() => newGame("hard")}
        >
          Hard
        </Button>
        {/* TODO
      <Divider className={styles.title} textAlign="left">
        Resume
      </Divider>
      <Button className={styles.button}>Resume last game</Button> 
      */}
      </div>
      <div></div>
    </div>
  );
}

export default Home;
