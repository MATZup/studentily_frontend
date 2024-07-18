import React, { useContext } from "react";
import ReactSlider from "react-slider";
import UnitContext from "./unitContext";
import GoBackButton from "./goBackButton";

export default function UnitPage() {
  const unitSettings = useContext(UnitContext);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-[27rem] max-870:w-[24rem] max-580:w-[21rem] max-465:w-[19rem] max-385:w-[18rem] max-350:w-[16.5rem] max-327:w-[15rem] max-307:w-[14rem] flex flex-col text-start">
        <div className="flex flex-col items-start">
          <span className="">
            Work | <b>{unitSettings.workMinutes}:00 </b>min.
          </span>
          <ReactSlider
            className="h-10 w-full bg-gray-800 rounded-lg mt-2"
            thumbClassName="thumb"
            trackClassName="track"
            value={unitSettings.workMinutes}
            onChange={(newValue) => unitSettings.setWorkMinutes(newValue)}
            min={1}
            max={120}
          />
          <span className="mt-5">
            Break | <b>{unitSettings.breakMinutes}:00 </b>min.
          </span>
          <ReactSlider
            id="slider_green"
            className="h-10 w-full bg-gray-800 rounded-lg mt-2"
            thumbClassName="thumb_green"
            trackClassName="track"
            value={unitSettings.breakMinutes}
            onChange={(newValue) => unitSettings.setBreakMinutes(newValue)}
            min={1}
            max={120}
          />
        </div>
        <div className="mt-6 flex justify-center">
          <GoBackButton
            onClick={() => unitSettings.setDisplayUnitPage(false)}
          />
        </div>
      </div>
    </div>
  );
}
