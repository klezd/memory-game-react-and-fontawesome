import {
  useEffect,
  useState,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import propTypes from "prop-types";

import Typography from "@mui/material/Typography";

import styles from "./Timer.module.css";

const Timer = forwardRef((props, ref) => {
  const { status } = props;

  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const [usedTime, setUsedTime] = useState(0);
  const [isRun, setRun] = useState(false);

  const intervalRef = useRef(null);
  let secondsPassed = usedTime;

  useImperativeHandle(
    ref, // forwarded ref
    function () {
      return {
        getResultState() {
          const result = (now - startTime) / 1000;
          return result;
        },
      }; // the forwarded ref value
    },
    [now, startTime]
  );

  const handlePause = useCallback(() => {
    console.log("paused game");
    setRun(false);

    const pass = now - startTime;

    setUsedTime(pass / 1000);

    clearInterval(intervalRef.current);
  }, [startTime, now]);

  const handleStop = useCallback(() => {
    console.log("stop game");
    setRun(false);

    const passed = (now - startTime) / 1000;
    setUsedTime(0);
    console.log(passed);
    clearInterval(intervalRef.current);
  }, [now, startTime]);

  const handleStart = useCallback(() => {
    console.log("start or resume game");

    setRun(true);

    setStartTime(Date.now() - usedTime * 1000);
    setNow(Date.now());

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 488);
  }, [usedTime]);

  useEffect(() => {
    if (status === "playing" && !isRun) {
      handleStart();
    } else if (status === "pause" && isRun) {
      handlePause();
    } else if (status === "finished" && isRun) {
      handleStop();
    } else {
      return;
    }
  }, [status, isRun, handlePause, handleStart, handleStop]);

  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <div className={styles.root}>
      <div className={styles.timer}>
        <Typography className={styles.timerDigit} variant="caption">
          {secondsPassed.toFixed(0)}
        </Typography>
      </div>
      {/* <Button onClick={() => handleStart()}>Start</Button>
      <Button onClick={() => handlePause()}>Pause</Button>
      <Button onClick={() => handleStop()}>Stop</Button> */}
    </div>
  );
});

Timer.defaultProps = {
  /****
   * finished => handleStop()
   * playing => handleStart()
   * pause => handlePause()
   ***/
  status: "finished",
};
Timer.propTypes = {
  status: propTypes.string,
};

export default Timer;
