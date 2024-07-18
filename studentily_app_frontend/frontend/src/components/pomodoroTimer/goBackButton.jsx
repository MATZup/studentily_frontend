import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function unitButton({ onClick }) {
  return (
    <div onClick={onClick}>
      <button className="text-white bg-gray-800 transition-all hover:px-6 p-4 rounded-full flex items-center">
        <span className="ml-2">Save</span>
        <FontAwesomeIcon className="mr-2 ml-2 w-5 h-5" icon={faCheck} />{" "}
      </button>
    </div>
  );
}
