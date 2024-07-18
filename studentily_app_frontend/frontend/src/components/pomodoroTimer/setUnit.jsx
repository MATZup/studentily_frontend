import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import unit from "../images/unit.png";

export default function setUnit({ onClick }) {
  return (
    <div onClick={onClick}>
      <button className="mt-6">
        <div className="flex items-center bg-gray-800 w-[11.8rem] hover:w-[12.6rem] transition-all justify-center rounded-[50px] p-4">
          <img className="w-8" src={unit} alt="" />
          <span className="text-xl ml-3 text-white font-medium">Duration</span>
        </div>
      </button>
    </div>
  );
}
