import React from "react";
import pomodoroBgImg from "../images/pomodoro_bg.png";

export default function pomodoroBg() {
  return (
    <div className="flex justify-center items-center">
      <img
        className="fixed max-960:w-[70rem] max-767:w-[68rem] max-650:w-[67rem] max-465:w-[64rem] max-385:w-[61rem] max-350:w-[59rem] max-w-[84rem] px-14 -bottom-8 z-[-50] w-[71rem] overflow-y-hidden"
        src={pomodoroBgImg}
        alt=""
      />
    </div>
  );
}
