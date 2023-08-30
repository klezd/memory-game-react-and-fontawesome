import { useCallback, useEffect, useRef, useState } from "react";
// import propTypes from "prop-types";
import Button from "@mui/material/Button";

import styles from "./Game.module.css";
import Timer from "../Timer";
import GameBoard from "./GameBoard";

function Game() {
  const timerRef = useRef();
  const boardRef = useRef();

  const [, setWin] = useState(false); //TODO get 'win' state and save progress
  // init, playing, pause, finished
  const [status, setStatus] = useState("init");
  // const [result, setResult] = useState(0);

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
  }, []);

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
      </div>
    </div>
  );
}

export default Game;
