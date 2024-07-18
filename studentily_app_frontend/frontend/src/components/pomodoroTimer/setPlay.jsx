import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default function setPlay({ onClick }) {
  return (
    <div onClick={onClick}>
      <button>
        <div className="flex justify-center items-center w-16 h-16 bg-gray-800 text-white rounded-[100%] p-4">
          <FontAwesomeIcon className="w-8 h-8 ml-1" icon={faPlay} />
        </div>
      </button>
    </div>
  );
}
