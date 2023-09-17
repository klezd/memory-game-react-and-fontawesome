import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import styles from "./Home.module.css";
import RankBoard from "../RankBoard/RankBoard";

function Home() {
  const navigate = useNavigate();

  const [openRB, setOpenRB] = useState(false);

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
      <div>
        <Divider className={styles.title} textAlign="left">
          Ranking
        </Divider>
        <Button
          variant="contained"
          className={styles.button}
          onClick={() => {
            setOpenRB(true);
          }}
        >
          Rank Board
        </Button>
      </div>
      <div></div>
      <Modal
        open={openRB}
        onClose={() => setOpenRB(false)}
        aria-labelledby="rank-modal-title"
        aria-describedby="ranks-modal-description"
      >
        <Box className={styles.box}>
          <RankBoard onClose={() => setOpenRB(false)} />
        </Box>
      </Modal>
    </div>
  );
}

export default Home;
