import { useCallback, useEffect, useRef, useState } from "react";
// import propTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import styles from "./Game.module.css";
import Timer from "../Timer";
import GameBoard from "./GameBoard";
import { db } from "../db";

function Game() {
  const timerRef = useRef();
  const boardRef = useRef();
  const navigate = useNavigate();

  const [, setWin] = useState(false); //TODO get 'win' state and save progress
  // status: init, playing, pause, finished
  const [status, setStatus] = useState("init");

  const location = useLocation();

  const pauseGame = useCallback(() => {
    if (status === "playing") setStatus("pause");
  }, [status]);

  const newGame = () => {
    setStatus("init");
    window.location.reload();
  };

  const startGame = useCallback(() => {
    if (status !== "playing") setStatus("playing");
  }, [status]);

  const finishGame = useCallback(() => {
    setWin(true);
    setStatus("finished");

    // Add data to indexDB
    const level = location.state.level;
    const result = timerRef.current.getResultState();
    const date = Date.now();
    const id = Math.floor(Date.now() / (Math.random() * 5) + Math.random() * 5);
    const resToDB = { id, level, result, date };
    addToDB(resToDB);
  }, [location]);

  const addToDB = async (objToAdd) => {
    try {
      // Add the new result!
      console.log("add to DB");
      const id = await db.result.add(objToAdd);
      console.log("added new res with id: " + id);
    } catch (error) {
      console.error(`Failed to add result to DB: ${error}`);
    }
  };

  useEffect(() => {
    // element
    const boardEle = boardRef.current;
    boardEle.addEventListener("click", startGame);

    return () => {
      boardEle.removeEventListener("click", startGame);
    };
  }, [startGame]);

  return (
    <div className={styles.gameContainer}>
      <div className={styles.heading}>
        <Timer ref={timerRef} status={status} />
      </div>
      <GameBoard ref={boardRef} finishGame={finishGame} />

      <div className={styles.buttonsContainer}>
        <Button
          variant="outlined"
          color="success"
          className={styles.button}
          onClick={() => navigate("/")}
        >
          Home
        </Button>
        <Button
          variant="outlined"
          color="success"
          className={styles.button}
          onClick={() => pauseGame()}
        >
          Pause Game
        </Button>
        <Button
          variant="outlined"
          color="success"
          className={styles.button}
          onClick={() => newGame()}
        >
          Reset Game
        </Button>
        <Button
          variant="outlined"
          color="success"
          className={styles.button}
          onClick={() => finishGame()}
        >
          Fake Finish Game
        </Button>
      </div>
    </div>
  );
}

export default Game;
