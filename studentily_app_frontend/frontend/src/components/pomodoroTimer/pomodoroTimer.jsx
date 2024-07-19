import React, { useContext, useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SetUnit from "../pomodoroTimer/setUnit";
import SetPlay from "../pomodoroTimer/setPlay";
import SetPause from "../pomodoroTimer/setPause";
import UnitContext from "./unitContext";

export default function PomodoroTimer() {
  const unitSettings = useContext(UnitContext);

  const [isPausedActive, setIsPausedActive] = useState(true);
  const [mode, setMode] = useState("work");
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedActiveRef = useRef(isPausedActive);
  const modeRef = useRef(mode);

  const changeMode = () => {
    const nextMode = modeRef.current === "work" ? "break" : "work";
    const nextSeconds =
      nextMode === "work"
        ? unitSettings.workMinutes * 60
        : unitSettings.breakMinutes * 60;
    setMode(nextMode);
    modeRef.current = nextMode;

    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  };

  const timeFn = () => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  };

  const timerRefresh = () => {
    const initialSeconds =
      modeRef.current === "work"
        ? unitSettings.workMinutes * 60
        : unitSettings.breakMinutes * 60;
    setSecondsLeft(initialSeconds);
    secondsLeftRef.current = initialSeconds;
  };

  useEffect(() => {
    timerRefresh();

    const intervalTimer = setInterval(() => {
      if (isPausedActiveRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        changeMode();
      } else {
        timeFn();
      }
    }, 1000);

    return () => clearInterval(intervalTimer);
  }, []);

  useEffect(() => {
    timerRefresh();
  }, [unitSettings.workMinutes, unitSettings.breakMinutes]);

  const maxSeconds =
    mode === "work"
      ? unitSettings.workMinutes * 60
      : unitSettings.breakMinutes * 60;
  const percentage = Math.round((secondsLeft / maxSeconds) * 100);

  const currentMinutes = Math.floor(secondsLeft / 60);
  let currentSeconds = secondsLeft % 60;

  if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;

  const color1 = "#2E3046";
  const color2 = "#A193D7";
  const color3 = "#93D79B";

  return (
    <div className="mt-14 max-580:mt-0">
      <CircularProgressbar
        className="w-[24rem] max-870:w-[23rem] max-580:w-[21rem] max-465:w-[19.4rem] max-385:w-[18rem] max-350:w-[16.8rem] max-327:w-[16rem] max-307:w-[15rem]"
        value={percentage}
        text={`${currentMinutes}:${currentSeconds}`}
        styles={buildStyles({
          textColor: color1,
          pathColor: mode === "work" ? color2 : color3,
          trailColor: color1,
        })}
      />
      <div className="flex justify-center mt-8">
        {isPausedActive ? (
          <SetPlay
            onClick={() => {
              setIsPausedActive(false);
              isPausedActiveRef.current = false;
            }}
          />
        ) : (
          <SetPause
            onClick={() => {
              setIsPausedActive(true);
              isPausedActiveRef.current = true;
            }}
          />
        )}
      </div>
      <div>
        <SetUnit onClick={() => unitSettings.setDisplayUnitPage(true)} />
      </div>
    </div>
  );
}
